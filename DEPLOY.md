# Чекліст запуску Navi Motors

## 1. Vercel Deploy
- [ ] Підключити GitHub/GitLab репозиторій до [vercel.com](https://vercel.com)
- [ ] Додати Environment Variables:
  - `NUXT_PUBLIC_SITE_URL` = `https://your-domain.com.ua`
  - `NUXT_TELEGRAM_BOT_TOKEN` = токен бота
  - `NUXT_TELEGRAM_CHAT_ID` = ID чату
  - `NUXT_PUBLIC_GA_ID` або `NUXT_PUBLIC_PLAUSIBLE_DOMAIN` (опціонально)
- [ ] Deploy — SSL активується автоматично
- [ ] Підключити домен у Vercel → Settings → Domains

## 2. Google Search Console
- [ ] Перейти на [search.google.com/search-console](https://search.google.com/search-console)
- [ ] Додати property (URL-prefix або Domain)
- [ ] Підтвердити власність (DNS або HTML tag)
- [ ] Надіслати sitemap: `https://your-domain.com.ua/sitemap.xml`

## 3. Google Business Profile
- [ ] Додати URL сайту
- [ ] Перевірити NAP: Navi Motors, вул. Віталія Скакуна 26, 098 535 50 80
- [ ] Оновити графік роботи
- [ ] Категорія: Автосервіс / Auto repair shop
- [ ] Додати послуги, опис, фото
- [ ] Посилання Instagram/TikTok
- [ ] Відповісти на відгуки

## 4. Тестування після деплою
- [ ] Форма заявки → Telegram
- [ ] Кнопка «Подзвонити» на мобільному
- [ ] «Прокласти маршрут» → Google Maps
- [ ] Перевірити Open Graph: [opengraph.xyz](https://www.opengraph.xyz)
- [ ] Перевірити Schema: [validator.schema.org](https://validator.schema.org)

## 5. Контент перед фінальним релізом
- [ ] Замінити SVG-плейсхолдери фото на реальні JPG/WebP
- [ ] Оновити `app/data/reviews.ts` реальними відгуками
- [ ] Додати TikTok URL у `app/data/site.ts`
- [ ] Підтвердити графік і ціни
