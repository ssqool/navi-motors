/** Analytics event names sent to GA4 */
export type AnalyticsEventName =
  | 'generate_lead'
  | 'form_start'
  | 'form_error'
  | 'phone_click'
  | 'booking_click'
  | 'map_click'
  | 'outbound_click'
  | 'service_click'
  | 'faq_expand'

/** Where on the page the interaction happened */
export type AnalyticsLocation =
  | 'header'
  | 'header_mobile_menu'
  | 'hero'
  | 'hero_trust_line'
  | 'sticky_bar'
  | 'lead_form'
  | 'lead_form_inline_phone'
  | 'map_section'
  | 'footer'
  | 'contacts_page'
  | 'about_page'
  | 'reviews_section'
  | 'social_section'
  | 'social_card'
  | 'services_grid'
  | 'service_page'
  | 'unknown'

export type AnalyticsPageType =
  | 'home'
  | 'services_list'
  | 'service'
  | 'contact'
  | 'about'
  | 'privacy'
  | 'other'

export interface AnalyticsEventPayload {
  event: AnalyticsEventName
  page_path?: string
  page_title?: string
  page_type?: AnalyticsPageType
  page_location?: string
  location?: AnalyticsLocation | string
  source_page?: string
  service_slug?: string
  service_name?: string
  platform?: string
  link_url?: string
  question?: string
  error_message?: string
}
