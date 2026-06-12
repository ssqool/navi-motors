/**
 * Shared scroll/footer state for the mobile sticky CTA bar and scroll-to-top offset.
 */
const isScrolled = ref(false)
const isFooterInView = ref(false)
const isAtDocumentEnd = ref(false)
const barHeight = ref(80)

let scrollListenerCount = 0
let footerObserver: IntersectionObserver | undefined

const isBarVisible = computed(
  () => isScrolled.value && !isFooterInView.value && !isAtDocumentEnd.value,
)

function checkScroll() {
  isScrolled.value = window.scrollY > 420

  const remaining = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)
  isAtDocumentEnd.value = remaining <= barHeight.value + 12
}

function observeFooter() {
  footerObserver?.disconnect()

  const footer = document.querySelector('[data-site-footer]')
  if (!footer) return

  footerObserver = new IntersectionObserver(
    ([entry]) => {
      isFooterInView.value = entry?.isIntersecting ?? false
    },
    { threshold: 0, rootMargin: `0px 0px -${barHeight.value}px 0px` },
  )

  footerObserver.observe(footer)
}

function bindScrollListener() {
  if (scrollListenerCount === 0) {
    checkScroll()
    window.addEventListener('scroll', checkScroll, { passive: true })
    observeFooter()
  }

  scrollListenerCount++

  return () => {
    scrollListenerCount--
    if (scrollListenerCount === 0) {
      window.removeEventListener('scroll', checkScroll)
      footerObserver?.disconnect()
      footerObserver = undefined
    }
  }
}

export function useMobileStickyCta() {
  function setBarHeight(height: number) {
    if (height > 0) {
      barHeight.value = height
      if (scrollListenerCount > 0) observeFooter()
    }
  }

  return {
    isScrolled,
    isFooterInView,
    isAtDocumentEnd,
    barHeight,
    isBarVisible,
    checkScroll,
    setBarHeight,
    bindScrollListener,
  }
}
