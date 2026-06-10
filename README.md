# Navi Motors — SEO-first сайт автосервісу

Сайт автосервісу Navi Motors (Київ): послуги, ціни, галерея, форма заявки, SEO-сторінки.

## Стек

- Nuxt 4 + TypeScript + Vue 3
- Tailwind CSS
- Vercel (деплой)
- Telegram Bot API — заявки з форми

## Локальна розробка

```bash
npm install
cp .env.example .env
# заповнити .env (Telegram bot token, chat id, site url)
npm run dev
```

Сайт: [http://localhost:3000](http://localhost:3000)

## Змінні середовища

| Змінна | Опис |
|--------|------|
| `NUXT_PUBLIC_SITE_URL` | URL сайту (canonical, sitemap, OG) |
| `NUXT_TELEGRAM_BOT_TOKEN` | Токен Telegram-бота (server-only) |
| `NUXT_TELEGRAM_CHAT_ID` | Chat ID для заявок (server-only) |
| `NUXT_META_ACCESS_TOKEN` | Meta token для oEmbed (опціонально) |
| `NUXT_PUBLIC_GA_ID` | Google Analytics (опціонально) |
| `NUXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible domain (опціонально) |

> **Не коміть `.env` у Git.** У репозиторії лише `.env.example`.

## Структура проєкту

```
app/
  components/   # UI-компоненти
  data/         # Контент (послуги, ціни, галерея, відгуки)
  pages/        # Маршрути
  composables/  # useSeo, useReveal
public/
  images/       # Лого, галерея, соцмережі
server/
  api/          # lead.post, social-preview
```

## GitHub

### 1. Створити репозиторій

На [github.com/new](https://github.com/new):

- Name: `navi-motors`
- **Private** (рекомендовано для клієнтського проєкту)
- Без README / .gitignore (вони вже є локально)

### 2. Залити код

```bash
cd navi-motors

git init
git add .
git status   # переконайся: немає .env, node_modules, .output, .nuxt
git commit -m "Initial commit: Navi Motors MVP"

git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/navi-motors.git
git push -u origin main
```

### 3. Що має потрапити в репо

- `app/`, `public/`, `server/`
- `nuxt.config.ts`, `tailwind.config.ts`, `package.json`, `package-lock.json`
- `.env.example`, `vercel.json`, `DEPLOY.md`
- `.gitignore`, `.gitattributes`, `.editorconfig`

### 4. Що НЕ має потрапити

- `.env` (секрети)
- `node_modules/`
- `.output/`, `.nuxt/`, `.vercel/`
- `.idea/`, `.cursor/`

## Деплой на Vercel

Детальний чекліст: [`DEPLOY.md`](DEPLOY.md)

1. [vercel.com](https://vercel.com) → Import Git Repository
2. Додати env-змінні з `.env.example`
3. Deploy → отримаєш preview URL для клієнта

## Скрипти

| Команда | Опис |
|---------|------|
| `npm run dev` | Dev-сервер |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run generate` | Static generate |

## Після запуску

- [ ] Google Search Console + sitemap
- [ ] Google Business Profile — оновити URL сайту
- [ ] Реальні фото СТО в `public/images/gallery/`
- [ ] Реальні відгуки в `app/data/reviews.ts`
- [ ] Підтвердити mock-дані (Telegram, Viber, email) — [`CLIENT_QUESTIONS.md`](CLIENT_QUESTIONS.md)
