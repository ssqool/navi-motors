# Navi Motors — launch checklist

## 1. Vercel deploy

- [ ] Connect GitHub repo to [vercel.com](https://vercel.com)
- [ ] Add environment variables:
  - `NUXT_PUBLIC_SITE_URL` = `https://your-domain.com.ua`
  - `NUXT_TELEGRAM_BOT_TOKEN` = bot token
  - `NUXT_TELEGRAM_CHAT_ID` = chat ID
  - `NUXT_PUBLIC_GA_ID` or `NUXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional)
- [ ] Deploy — SSL is enabled automatically
- [ ] Add custom domain in Vercel → Settings → Domains
- [ ] Update `NUXT_PUBLIC_SITE_URL` to the final domain and redeploy

## 2. Google Search Console

- [ ] Open [search.google.com/search-console](https://search.google.com/search-console)
- [ ] Add property (URL prefix or Domain)
- [ ] Verify ownership (DNS or HTML tag)
- [ ] Submit sitemap: `https://your-domain.com.ua/sitemap.xml`

## 3. Google Business Profile

- [ ] Add website URL
- [ ] Verify NAP consistency: Navi Motors, vul. Vitaliya Skakuna 26, Kyiv, 098 535 50 80
- [ ] Update business hours
- [ ] Category: Auto repair shop
- [ ] Add services, description, photos
- [ ] Link Instagram / TikTok
- [ ] Reply to reviews

## 4. Post-deploy smoke test

- [ ] Lead form → Telegram notification
- [ ] “Call” button works on mobile
- [ ] “Get directions” → Google Maps
- [ ] Open Graph preview: [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Schema validation: [validator.schema.org](https://validator.schema.org)

## 5. Content before final release

- [ ] Replace placeholder gallery images with real workshop photos
- [ ] Update `app/data/reviews.ts` with real Google reviews
- [ ] Confirm prices and working hours with the client
- [ ] Replace mock contact channels (Telegram, Viber, email) in `app/data/site.ts`
