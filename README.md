# Navi Motors — SEO-first auto service website

Marketing website for **Navi Motors**, an auto repair shop in **Kyiv, Ukraine**.  
Public-facing copy is **Ukrainian**; repo docs and code comments are **English**.

## Stack

- Nuxt 4 + TypeScript + Vue 3
- Tailwind CSS
- Vercel (hosting)
- Telegram Bot API (lead form submissions)

## Features

- Service pages with local SEO (`/poslugy/[slug]`)
- Lead form with honeypot, rate limiting, privacy consent
- JSON-LD (AutoRepair, FAQ, Breadcrumbs, Service)
- Sitemap, robots, Open Graph, geo meta (Kyiv)
- Mobile sticky CTA bar
- Pages: Home, Services, About, Contacts, Privacy Policy

## Local development

```bash
npm install
cp .env.example .env
# fill in .env (Telegram bot token, chat id, site url)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment variables

| Variable | Description |
|----------|-------------|
| `NUXT_PUBLIC_SITE_URL` | Public site URL (canonical, sitemap, OG) |
| `NUXT_TELEGRAM_BOT_TOKEN` | Telegram bot token (server-only) |
| `NUXT_TELEGRAM_CHAT_ID` | Chat ID for lead notifications (server-only) |
| `NUXT_META_ACCESS_TOKEN` | Meta oEmbed token (optional) |
| `NUXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID, e.g. `G-XXXXXXXXXX` (optional, free) |

> **Never commit `.env`.** Only `.env.example` belongs in the repo.

## Project structure

```
app/
  components/   # UI components
  composables/  # useSeo, useReveal, useStructuredData, useBookingLink, useAnalytics
  data/         # Site content (services, prices, gallery, reviews) — Ukrainian
  pages/        # Routes
public/
  logo.svg      # Brand logo (SVG, used in header/footer)
  images/       # Gallery, social thumbnails, logo PNG fallbacks
server/
  api/          # lead.post, social-preview, sitemap urls
```

## Deploy to Vercel

See [`DEPLOY.md`](DEPLOY.md) for the full checklist.

1. Import the GitHub repo at [vercel.com](https://vercel.com)
2. Add env vars from `.env.example`
3. Deploy — SSL is automatic
4. Set `NUXT_PUBLIC_SITE_URL` to your production domain and redeploy

## Analytics (GA4)

See [`docs/ANALYTICS.md`](docs/ANALYTICS.md) — client setup in 3 steps, free Google Analytics 4.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run generate` | Static generate |

## Pre-launch checklist

- [ ] Replace mock photos in `public/images/gallery/`
- [ ] Update real reviews in `app/data/reviews.ts`
- [ ] Set `IS_MOCK_DATA = false` in `app/data/mock.ts` after GBP data is confirmed
- [ ] Confirm client inputs — [`CLIENT_QUESTIONS.md`](CLIENT_QUESTIONS.md)
- [ ] Google Search Console + sitemap
- [ ] Google Business Profile — update website URL and NAP

## Content language

| Layer | Language |
|-------|----------|
| Website UI & SEO copy | Ukrainian (`lang="uk"`) |
| Code, comments, docs | English |
