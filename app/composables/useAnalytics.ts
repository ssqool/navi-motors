import type {
  AnalyticsEventName,
  AnalyticsEventPayload,
  AnalyticsLocation,
  AnalyticsPageType,
} from '~/types/analytics'

function isAnalyticsEnabled() {
  const config = useRuntimeConfig()
  return Boolean(config.public.gaId)
}

function sendEvent(event: AnalyticsEventName, params: Record<string, unknown> = {}) {
  if (!import.meta.client || !isAnalyticsEnabled()) return
  if (typeof window.gtag !== 'function') return

  window.gtag('event', event, params)
}

export function getPageType(path: string): AnalyticsPageType {
  if (path === '/') return 'home'
  if (path === '/poslugy') return 'services_list'
  if (path.startsWith('/poslugy/')) return 'service'
  if (path === '/kontakty') return 'contact'
  if (path === '/pro-nas') return 'about'
  if (path === '/polityka-konfidentsiynosti') return 'privacy'
  return 'other'
}

export function useAnalytics() {
  const route = useRoute()
  const config = useRuntimeConfig()

  function pushEvent(
    event: AnalyticsEventName,
    params: Omit<AnalyticsEventPayload, 'event'> = {},
  ) {
    sendEvent(event, params as Record<string, unknown>)
  }

  function trackPageView(options?: {
    path?: string
    title?: string
    pageType?: AnalyticsPageType
  }) {
    if (!import.meta.client || !isAnalyticsEnabled()) return
    if (typeof window.gtag !== 'function') return

    const path = options?.path ?? route.fullPath
    const pageType = options?.pageType ?? getPageType(route.path)
    const gaId = config.public.gaId as string

    window.gtag('config', gaId, {
      page_path: path,
      page_title: options?.title ?? document.title,
      page_location: `${config.public.siteUrl}${path}`,
      page_type: pageType,
    })
  }

  function trackPhoneClick(location: AnalyticsLocation | string) {
    sendEvent('phone_click', { location })
  }

  function trackBookingClick(location: AnalyticsLocation | string) {
    sendEvent('booking_click', { location })
  }

  function trackMapClick(location: AnalyticsLocation | string) {
    sendEvent('map_click', { location })
  }

  function trackOutboundClick(
    platform: string,
    linkUrl: string,
    location: AnalyticsLocation | string = 'unknown',
  ) {
    sendEvent('outbound_click', {
      platform,
      link_url: linkUrl,
      location,
    })
  }

  function trackServiceClick(
    serviceSlug: string,
    serviceName: string,
    location: AnalyticsLocation | string = 'services_grid',
  ) {
    sendEvent('service_click', {
      service_slug: serviceSlug,
      service_name: serviceName,
      location,
    })
  }

  function trackFaqExpand(question: string) {
    sendEvent('faq_expand', { question })
  }

  function trackFormStart(sourcePage: string) {
    sendEvent('form_start', { source_page: sourcePage, location: 'lead_form' })
  }

  function trackLeadSubmit(sourcePage: string) {
    sendEvent('generate_lead', { source_page: sourcePage, location: 'lead_form' })
  }

  function trackFormError(sourcePage: string, errorMessage?: string) {
    sendEvent('form_error', {
      source_page: sourcePage,
      location: 'lead_form',
      error_message: errorMessage,
    })
  }

  return {
    isEnabled: computed(() => isAnalyticsEnabled()),
    pushEvent,
    trackPageView,
    trackPhoneClick,
    trackBookingClick,
    trackMapClick,
    trackOutboundClick,
    trackServiceClick,
    trackFaqExpand,
    trackFormStart,
    trackLeadSubmit,
    trackFormError,
  }
}
