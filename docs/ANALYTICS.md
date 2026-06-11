# Analytics — Google Analytics 4 (free)

The site uses **direct GA4** (no GTM). The client only needs one ID.

## For the client (3 steps)

### 1. Create GA4 property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Admin → Create property → name it **Navi Motors**
3. Data stream → **Web** → enter site URL
4. Copy **Measurement ID** — format `G-XXXXXXXXXX`

### 2. Add ID to the site

Send the ID to the developer. They add it in Vercel:

```
NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Redeploy — done. **Free, no monthly fee.**

### 3. Mark lead as conversion (recommended)

In GA4: **Admin → Events → find `generate_lead` → Mark as conversion**

Also useful: `phone_click`, `booking_click`

---

## What is tracked automatically

| Action | GA4 event |
|--------|-----------|
| Page views (all pages) | via `page_view` |
| Lead form submitted | `generate_lead` |
| User starts form | `form_start` |
| Form error | `form_error` |
| Phone button | `phone_click` |
| “Записатись” button | `booking_click` |
| “Прокласти маршрут” | `map_click` |
| Service card click | `service_click` |
| FAQ opened | `faq_expand` |
| Instagram / TikTok / Google Reviews | `outbound_click` |

Each click includes `location` (e.g. `header`, `hero`, `sticky_bar`) for reporting.

---

## Testing

1. Add `NUXT_PUBLIC_GA_ID=G-XXXXXXXXXX` to `.env` or Vercel
2. Open the site
3. GA4 → **Reports → Realtime** — you should see yourself
4. Click “Подзвонити”, submit test lead — check **Event count by Event name**
5. Optional: [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) + **Admin → DebugView**

---

## Optional: Plausible (paid alternative)

Privacy-focused, simpler dashboard, ~€9/mo. Requires separate env var `NUXT_PUBLIC_PLAUSIBLE_DOMAIN`.  
Most clients use **GA4 only** — it's free and enough for a local auto service.

---

## Developer reference

| File | Role |
|------|------|
| `app/plugins/analytics.client.ts` | Loads gtag.js |
| `app/composables/useAnalytics.ts` | Event helpers |

No GTM container, no Tag Assistant setup required.
