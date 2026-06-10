/** Booking link — #lead-form on current page or /#lead-form elsewhere */
export function useBookingLink() {
  const route = useRoute()

  const hasLeadFormOnPage = computed(() =>
    route.path === '/'
    || route.path === '/kontakty'
    || route.path === '/pro-nas'
    || route.path.startsWith('/poslugy'),
  )

  const bookingTo = computed(() =>
    hasLeadFormOnPage.value
      ? { path: route.path, hash: '#lead-form' }
      : '/#lead-form',
  )

  return { bookingTo, hasLeadFormOnPage }
}
