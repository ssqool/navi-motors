export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const gaId = config.public.gaId as string
  const plausibleDomain = config.public.plausibleDomain as string

  if (gaId) {
    useHead({
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
          async: true,
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `,
        },
      ],
    })
  }

  if (plausibleDomain) {
    useHead({
      script: [
        {
          defer: true,
          'data-domain': plausibleDomain,
          src: 'https://plausible.io/js/script.js',
        },
      ],
    })
  }
})
