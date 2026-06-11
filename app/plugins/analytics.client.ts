export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const gaId = config.public.gaId as string
  const plausibleDomain = config.public.plausibleDomain as string

  if (gaId) {
    useHead({
      script: [
        {
          key: 'ga4',
          src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
          async: true,
        },
        {
          key: 'ga4-init',
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', { send_page_view: false });
          `,
        },
      ],
    })

    const { trackPageView } = useAnalytics()

    nuxtApp.hook('page:finish', () => {
      nextTick(() => trackPageView())
    })
  }

  if (plausibleDomain) {
    useHead({
      script: [
        {
          key: 'plausible',
          defer: true,
          'data-domain': plausibleDomain,
          src: 'https://plausible.io/js/script.js',
        },
      ],
    })
  }
})
