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
  if (!body.problem?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Опишіть проблему' })
  }
}

function formatTelegramMessage(body: Required<Pick<LeadBody, 'name' | 'phone' | 'problem'>> & LeadBody) {
  const lines = [
    'Нова заявка з сайту Navi Motors',
    '',
    `Імʼя: ${body.name}`,
    `Телефон: ${body.phone}`,
  ]

  if (body.car) lines.push(`Авто: ${body.car}`)
  lines.push(`Проблема: ${body.problem}`)
  if (body.preferredDay) lines.push(`Бажаний день: ${body.preferredDay}`)
  if (body.sourcePage) lines.push(`Сторінка: ${body.sourcePage}`)

  return lines.join('\n')
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
    car: body.car?.trim(),
    preferredDay: body.preferredDay?.trim(),
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
  ).catch((error) => {
    console.error('[lead] Telegram API error:', error)
    throw createError({ statusCode: 502, statusMessage: 'Не вдалося надіслати заявку' })
  })

  if (!response.ok) {
    console.error('[lead] Telegram response not ok:', response.description)
    throw createError({ statusCode: 502, statusMessage: 'Не вдалося надіслати заявку' })
  }

  return { success: true }
})
