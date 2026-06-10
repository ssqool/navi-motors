// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV === 'development' },

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
    preload: true,
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'uk' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { name: 'theme-color', content: '#050505' },
        { name: 'apple-mobile-web-app-title', content: 'Navi Motors' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://navi-motors.com.ua',
    name: 'Navi Motors',
    description: 'Автосервіс у Києві — діагностика, ТО та ремонт авто. Navi Motors, вул. Віталія Скакуна, 26.',
    defaultLocale: 'uk',
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
    exclude: ['/api/**'],
  },

  robots: {
    allow: '/',
    disallow: ['/api/'],
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
        '/pro-nas',
        '/kontakty',
        '/polityka-konfidentsiynosti',
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
