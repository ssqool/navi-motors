# Navi Motors — після запуску на фінальний домен

> Чеклист для етапу **після** підключення `https://navimotors.kyiv.ua`.  
> Тестовий staging: `https://navi-motors.vercel.app` — до запуску.  
> Загальний deploy: [DEPLOY.md](../DEPLOY.md) · Аналітика: [ANALYTICS.md](./ANALYTICS.md)

**Фінальний домен:** `https://navimotors.kyiv.ua`

---

## Швидкий порядок дій

| # | Хто | Що | Час |
|---|-----|-----|-----|
| 1 | Ти | DNS + домен у Vercel | 15–30 хв |
| 2 | Ти | `NUXT_PUBLIC_SITE_URL` → фінальний домен + redeploy | 10 хв |
| 3 | Ти | Smoke test на prod (індексація, SEO, форма) | 15 хв |
| 4 | Ти | Перевірити, що `vercel.app` лишається noindex | 5 хв |
| 5 | Клієнт | Сайт у Google Business Profile + NAP | 5 хв |
| 6 | Ти | Google Search Console + sitemap | 20 хв |
| 7 | Ти | opengraph.xyz + validator.schema.org | 10 хв |
| 8 | Клієнт | Відповіді на контент (див. розділ 7) | 1 повідомлення |
| 9 | Ти | Оновити контент на сайті після відповідей | 30 хв |

---

## 1. Домен і Vercel

### 1.1 Підключити домен

1. [vercel.com](https://vercel.com) → проект **navi-motors** → **Settings** → **Domains**
2. Додати `navimotors.kyiv.ua` (і за бажанням `www.navimotors.kyiv.ua`)
3. У реєстратора домену додати DNS-записи, які показує Vercel (зазвичай **A** / **CNAME**)
4. Дочекатися статусу **Valid** (SSL Vercel видає автоматично)

### 1.2 Оновити змінні середовища

**Settings** → **Environment Variables** → **Production**:

| Змінна | Значення |
|--------|----------|
| `NUXT_PUBLIC_SITE_URL` | `https://navimotors.kyiv.ua` |
| `NUXT_TELEGRAM_BOT_TOKEN` | токен бота (без лапок) |
| `NUXT_TELEGRAM_CHAT_ID` | `-5140463672` |
| `NUXT_PUBLIC_GA_ID` | `G-…` (опційно, якщо клієнт хоче аналітику) |

> Якщо на staging було `https://navi-motors.vercel.app` — **обовʼязково** замінити на фінальний URL.

### 1.3 Redeploy

Після зміни env: **Deployments** → останній деплой → **Redeploy**.  
Без redeploy server routes (`/api/lead`) не побачать нові змінні.

### 1.4 Захист staging (вже в коді — перевірити після деплою)

На **`*.vercel.app`** сайт **не індексується** автоматично:

| Механізм | Файл | Що робить |
|----------|------|-----------|
| `<meta name="robots">` | `app/composables/useSeo.ts` | `noindex, nofollow` на staging-host |
| `robots.txt` | `server/plugins/staging-noindex.ts` | `Disallow: /` через `indexable: false` |
| Preview-деплої | `nuxt.config.ts` | `disallow: /` для `VERCEL_ENV !== production` |

Canonical і JSON-LD на staging лишаються на **`navimotors.kyiv.ua`** (якщо так задано в `NUXT_PUBLIC_SITE_URL`) — Google не плутає домени.

**Після запуску prod** переконайся:

- [ ] `https://navimotors.kyiv.ua/robots.txt` → дозволяє індексацію + sitemap
- [ ] `https://navimotors.kyiv.ua` → `<meta name="robots" content="index, follow, ...">`
- [ ] `https://navi-motors.vercel.app/robots.txt` → **блокує** індексацію
- [ ] `https://navi-motors.vercel.app` → `<meta name="robots" content="noindex, nofollow">`

> Якщо Google встиг проіндексувати `vercel.app` до запуску — див. розділ **3.1**.

---

## 2. Smoke test на prod

Перевірити саме **`https://navimotors.kyiv.ua`**, не Vercel URL.

### Обовʼязково

- [ ] Головна, послуги, про нас, контакти відкриваються без помилок
- [ ] **Форма заявки** → повідомлення в Telegram-групі
- [ ] Кнопка **«Подзвонити»** на телефоні → `tel:+380985355080`
- [ ] **«Прокласти маршрут»** → Google Maps (правильна адреса)
- [ ] Telegram / Viber / Instagram / TikTok — посилання відкриваються
- [ ] Карта на сторінці контактів завантажується
- [ ] `https://navimotors.kyiv.ua/sitemap.xml` — відповідає 200
- [ ] `https://navimotors.kyiv.ua/robots.txt` — дозволяє індексацію
- [ ] `<meta name="robots">` на prod → `index, follow` (не `noindex`)

### SEO / превʼю

- [ ] Canonical у `<head>` → `https://navimotors.kyiv.ua/...`
- [ ] `og:image` відкривається (URL з prod або staging — обидва OK для превʼю)
- [ ] [opengraph.xyz](https://www.opengraph.xyz) — title, description (~125 символів), image OK
- [ ] [validator.schema.org](https://validator.schema.org) — LocalBusiness, FAQ, aggregateRating без критичних помилок

### Staging (не для клієнта / не для GBP)

- [ ] `https://navi-motors.vercel.app` → `noindex, nofollow`
- [ ] `https://navi-motors.vercel.app/robots.txt` → `Disallow: /`
- [ ] Не додавати `vercel.app` у Google Business Profile, Instagram bio, рекламу

### Якщо форма не працює

| Симптом | Що перевірити |
|---------|----------------|
| 502 | env vars + redeploy |
| 400 від Telegram | `chat_id` з мінусом, бот у групі |
| Немає повідомлення | права бота в групі, новий токен якщо старий скомпрометований |
| Логи | Vercel → Deployments → Functions → `/api/lead` |

---

## 3. Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console)
2. **Додати ресурс** → **Префікс URL** → `https://navimotors.kyiv.ua`
3. **Підтвердити власність** (TXT у DNS через реєстратора — найнадійніше)
4. **Файли Sitemap** → додати:
   ```
   https://navimotors.kyiv.ua/sitemap.xml
   ```
5. **Перевірка URL** → головна → **Запросити індексування**

Індексація займає від кількох днів до кількох тижнів — це нормально.

### 3.1 Якщо Google проіндексував `vercel.app`

Після деплою з `noindex` Google сам прибере staging-URL, але це може зайняти тижні.

**Швидше (опційно):**

1. Search Console → додати ресурс `https://navi-motors.vercel.app` (окремо від prod)
2. **Видалення** → **Тимчасове видалення URL** → префікс `https://navi-motors.vercel.app/`
3. Переконатися, що `robots.txt` на vercel.app блокує індексацію (розділ 1.4)

**Не робити:** не додавати sitemap для `vercel.app` — тільки для `navimotors.kyiv.ua`.

---

## 4. Google Business Profile (клієнт + ти)

### Клієнт (5 хв)

1. Відкрити профіль **Navi Motors** у Google Maps / [business.google.com](https://business.google.com)
2. **Веб-сайт** → `https://navimotors.kyiv.ua`
3. Звірити NAP з сайтом:

| Поле | Значення |
|------|----------|
| Назва | Navi Motors |
| Адреса | вул. Віталія Скакуна, 26, Київ, 02000 |
| Телефон | 098 535 50 80 |
| Години | Пн–Сб 10:00–18:00 |
| Категорія | Автосервіс |

### Ти (після клієнта)

- [ ] NAP на сайті = NAP у Google (буква в букву)
- [ ] Посилання на Google Maps у `app/data/site.ts` актуальне
- [ ] Рейтинг на сайті (4.7 · 12) збігається з GBP — якщо змінився, оновити `app/data/reviews.ts`

---

## 5. Аналітика (опційно)

Якщо клієнт хоче статистику:

1. Створити GA4 → Measurement ID `G-…`
2. Додати `NUXT_PUBLIC_GA_ID` у Vercel → redeploy
3. У GA4: позначити `generate_lead` як conversion

Детально: [ANALYTICS.md](./ANALYTICS.md)

> Якщо GA4 увімкнено — варто додати cookie-банер (зараз не реалізовано).

---

## 6. Що перевірити в коді після перемикання домену

Після деплою на фінальний домен переконайся (View Source):

**На `https://navimotors.kyiv.ua`:**

```
<meta name="robots" content="index, follow, max-image-preview:large, ...">
<link rel="canonical" href="https://navimotors.kyiv.ua">
<meta property="og:url" content="https://navimotors.kyiv.ua">
<meta property="og:image" content="https://navimotors.kyiv.ua/images/og/navi-motors.png">
```

**На `https://navi-motors.vercel.app` (staging):**

```
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="https://navimotors.kyiv.ua">
```

JSON-LD має містити `navimotors.kyiv.ua`, не `vercel.app`.

---

## 7. Контент — уточнити у клієнта

Після запуску сайт уже працює, але для «ідеалу» варто закрити ці пункти.  
Повний опитник: [CLIENT_QUESTIONS.md](../CLIENT_QUESTIONS.md)

**Must (одне повідомлення клієнту):**

1. **«3+ років досвіду»** і **«1200+ ремонтів»** на «Про нас» — правда чи прибрати?
2. **Гарантія** — скільки днів або км на роботи?
3. **ТО від 1000 грн** — що входить?
4. **Неділя / обідня перерва** — підтвердити

**Nice to have:**

5. Фото **фасаду / вивіски** (GBP + hero)
6. Чи потрібна **GA4**
7. Email на сайті (зараз немає — лише телефон / мессенджери)

Після відповідей оновити: `app/data/about.ts`, `app/data/mock.ts`, за потреби `prices.ts`, `site.ts`.

---

## 8. Безпека

- [ ] Токен Telegram **не** в git, **не** в публічних чатах
- [ ] Якщо токен світився — revoke в [@BotFather](https://t.me/BotFather) → новий токен у Vercel → redeploy
- [ ] `docs/CLIENT_TELEGRAM.md` — лише локально (у `.gitignore`)

---

## 9. Перший тиждень після запуску

- [ ] Щодня: тест форми (1 раз)
- [ ] Search Console → **Покриття** / **Сторінки** — чи зʼявляються URL
- [ ] Перевірити сайт з **мобільного** (Safari + Chrome)
- [ ] Надіслати клієнту посилання + коротку інструкцію «як перевірити заявку в Telegram»
- [ ] Запропонувати клієнту додати сайт у підпис Instagram / TikTok

---

## 10. Staging → production

| Що | Staging (`*.vercel.app`) | Production (`navimotors.kyiv.ua`) |
|----|--------------------------|-----------------------------------|
| URL | `navi-motors.vercel.app` | `navimotors.kyiv.ua` |
| `NUXT_PUBLIC_SITE_URL` | **`https://navimotors.kyiv.ua`** (canonical одразу) | **`https://navimotors.kyiv.ua`** |
| `<meta robots>` | `noindex, nofollow` (авто) | `index, follow` |
| `robots.txt` | `Disallow: /` (авто) | Allow + sitemap |
| Клієнту показувати | staging для approve | фінальний після DNS |
| Search Console | не потрібно (або видалення URL — §3.1) | після prod |
| GBP website | **не** додавати vercel | **після prod** |

Vercel URL можна залишити для майбутніх оновлень — він не замінює prod і не індексується.

**Код захисту staging** (не чіпати після лончу):

- `app/utils/isStagingHost.ts`
- `server/plugins/staging-noindex.ts`
- логіка в `app/composables/useSeo.ts`

---

## Текст для клієнта (копіювати)

```
Сайт запущено: https://navimotors.kyiv.ua

Будь ласка:
1. Додай цей URL у Google Maps (твій бізнес-профіль → Веб-сайт).
2. Перевір адресу, телефон і години — мають збігатись із сайтом.
3. Відповідай на заявки з сайту — вони приходять у Telegram-групу.

Якщо форма не працює — напиши мені одразу.
```

---

## Контакти проекту (довідково)

| | |
|---|---|
| Телефон | 098 535 50 80 |
| Telegram | @NAVI_MOTORS_KYIV |
| Адреса | вул. Віталія Скакуна, 26, Київ |
| Години | Пн–Сб 10:00–18:00 |
