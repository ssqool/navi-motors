/** Sticky header offset for hash / anchor scroll (h-16 mobile, md:h-20 desktop). */
export function headerScrollOffset(): number {
  if (import.meta.server) return 64

  const header = document.querySelector('header')
  if (header) {
    return Math.ceil(header.getBoundingClientRect().height)
  }

  return window.matchMedia('(min-width: 768px)').matches ? 80 : 64
}
