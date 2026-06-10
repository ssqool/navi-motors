// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  css: ['~/assets/css/main.css'],

  image: {
    domains: ['images.unsplash.com'],
    provider: 'none',
  },

  googleFonts: {
    families: {
      Oswald: [400, 500, 600, 700],
      Manrope: [400, 500, 600, 700],
    },
    display: 'swap',
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'uk' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://navi-motors.com.ua',
    name: 'Navi Motors',
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  robots: {
    allow: '/',
    sitemap: '/sitemap.xml',
  },

  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: '',
    metaAccessToken: process.env.NUXT_META_ACCESS_TOKEN || '',
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://navi-motors.com.ua',
      gaId: process.env.NUXT_PUBLIC_GA_ID || '',
      plausibleDomain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN || '',
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/poslugy',
        '/kontakty',
        '/poslugy/diagnostyka-avto-kyiv',
        '/poslugy/tehnichne-obslugovuvannia-kyiv',
        '/poslugy/remont-hodovoi-kyiv',
        '/poslugy/remont-galm-kyiv',
        '/poslugy/remont-dvyguna-kyiv',
        '/poslugy/remont-transmisii-kyiv',
        '/poslugy/remont-rulevoho-upravlinnia-kyiv',
        '/poslugy/perevirka-avto-pered-kupivleiu-kyiv',
      ],
    },
  },
})
