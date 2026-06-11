<script setup lang="ts">
const barRef = ref<HTMLElement | null>(null)
const isScrolled = ref(false)
const isFooterInView = ref(false)
const isAtDocumentEnd = ref(false)
const barHeight = ref(80)

const isVisible = computed(() => isScrolled.value && !isFooterInView.value && !isAtDocumentEnd.value)

function measureBar() {
  const height = barRef.value?.offsetHeight
  if (height && height > 0) barHeight.value = height
}

function checkScroll() {
  isScrolled.value = window.scrollY > 420

  const remaining = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)
  isAtDocumentEnd.value = remaining <= barHeight.value + 12
}

onMounted(() => {
  checkScroll()
  window.addEventListener('scroll', checkScroll, { passive: true })

  const footer = document.querySelector('[data-site-footer]')
  if (footer) {
    let observer: IntersectionObserver | undefined

    const observeFooter = () => {
      observer?.disconnect()
      try {
        observer = new IntersectionObserver(
          ([entry]) => {
            isFooterInView.value = entry?.isIntersecting ?? false
          },
          { threshold: 0, rootMargin: `0px 0px -${barHeight.value}px 0px` },
        )
        observer.observe(footer)
      }
      catch {
        // Observer unavailable — scroll check still handles document end
      }
    }

    observeFooter()

    watch(barHeight, observeFooter)

    onUnmounted(() => observer?.disconnect())
  }

  watch(isVisible, (visible) => {
    if (visible) nextTick(measureBar)
  }, { immediate: true })

  watch(barRef, (el, _, onCleanup) => {
    if (!el) return
    measureBar()
    const resizeObserver = new ResizeObserver(measureBar)
    resizeObserver.observe(el)
    onCleanup(() => resizeObserver.disconnect())
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <Transition name="sticky-cta">
    <div
      v-if="isVisible"
      ref="barRef"
      class="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
      role="region"
      aria-label="Швидкий запис"
    >
      <div class="container-narrow flex gap-3">
        <UiPhoneButton variant="secondary" class="w-full flex-1" location="sticky_bar" />
        <UiBookingButton class="w-full flex-1" location="sticky_bar" />
      </div>
    </div>
  </Transition>
</template>
