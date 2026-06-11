const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60_000

export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT) {
    return false
  }

  entry.count++
  return true
}

interface LeadBody {
  name?: string
  phone?: string
  car?: string
  problem?: string
  preferredDay?: string
  sourcePage?: string
}

function validateLead(body: LeadBody) {
  if (!body.name?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Імʼя обовʼязкове' })
  }
  if (!body.phone?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Телефон обовʼязковий' })
  }
  if (!body.car?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Вкажіть марку та модель авто' })
  }
  if (!body.problem?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Опишіть проблему' })
  }
  if (!body.preferredDay?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Вкажіть бажаний день' })
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function formatPhoneDisplay(phone: string): string {
  let digits = phone.replace(/\D/g, '')
  if (digits.startsWith('380')) digits = digits.slice(3)
  else if (digits.startsWith('0')) digits = digits.slice(1)
  if (digits.length !== 9) return phone

  return `+380 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`
}

function formatKyivTimestamp(): string {
  return new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())
}

function telegramField(label: string, value: string, options?: { copyable?: boolean }) {
  const safeValue = escapeHtml(value)
  const rendered = options?.copyable ? `<code>${safeValue}</code>` : safeValue

  return `<b>${label}</b>\n${rendered}`
}

function formatTelegramMessage(
  body: Required<Pick<LeadBody, 'name' | 'phone' | 'car' | 'problem' | 'preferredDay'>> & Pick<LeadBody, 'sourcePage'>,
) {
  const blocks = [
    '✨ <b>Нова заявка · Navi Motors</b>',
    '',
    telegramField('👤 Імʼя', body.name),
    telegramField('📞 Телефон', formatPhoneDisplay(body.phone), { copyable: true }),
  ]

  blocks.push('', telegramField('🚙 Авто', body.car!))
  blocks.push('', telegramField('🔧 Проблема', body.problem))
  blocks.push('', telegramField('📅 Бажаний день', body.preferredDay!))

  const footer: string[] = []
  if (body.sourcePage) footer.push(`📍 ${escapeHtml(body.sourcePage)}`)
  footer.push(`🕐 ${formatKyivTimestamp()}`)

  blocks.push('', '───────────────', footer.join('  ·  '))

  return blocks.join('\n')
}

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'

  if (!checkRateLimit(ip)) {
    throw createError({ statusCode: 429, statusMessage: 'Забагато запитів. Спробуйте пізніше.' })
  }

  const body = await readBody<LeadBody>(event)
  validateLead(body)

  const config = useRuntimeConfig()
  const token = config.telegramBotToken
  const chatId = config.telegramChatId

  if (!token || !chatId) {
    console.warn('[lead] Telegram credentials not configured')
    throw createError({ statusCode: 503, statusMessage: 'Сервіс тимчасово недоступний' })
  }

  const message = formatTelegramMessage({
    name: body.name!.trim(),
    phone: body.phone!.trim(),
    problem: body.problem!.trim(),
    car: body.car!.trim(),
    preferredDay: body.preferredDay!.trim(),
    sourcePage: body.sourcePage?.trim(),
  })

  const response = await $fetch<{ ok: boolean; description?: string }>(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: 'POST',
      body: {
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      },
    },
  ).catch((error: { data?: { description?: string } }) => {
    console.error('[lead] Telegram API error:', error.data?.description ?? error)
    throw createError({ statusCode: 502, statusMessage: 'Не вдалося надіслати заявку' })
  })

  if (!response.ok) {
    console.error('[lead] Telegram response not ok:', response.description)
    throw createError({ statusCode: 502, statusMessage: 'Не вдалося надіслати заявку' })
  }

  return { success: true }
})
