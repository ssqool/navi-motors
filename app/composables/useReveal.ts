interface UseRevealOptions {
  threshold?: number
  once?: boolean
}

export function useReveal(options: UseRevealOptions = {}) {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isVisible.value = true
      return
    }

    const el = target.value
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true
          if (options.once !== false) observer.disconnect()
        }
      },
      {
        threshold: options.threshold ?? 0.12,
        rootMargin: '0px 0px -6% 0px',
      },
    )

    observer.observe(el)
    onUnmounted(() => observer.disconnect())
  })

  return { target, isVisible }
}
