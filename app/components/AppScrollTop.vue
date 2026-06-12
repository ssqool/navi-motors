<script setup lang="ts">
const SCROLL_THRESHOLD = 480

const isVisible = ref(false)
const isMobile = ref(false)

const { isBarVisible, bindScrollListener } = useMobileStickyCta()

const offsetForStickyCta = computed(() => isMobile.value && isBarVisible.value)

function checkScrollTop() {
  isVisible.value = window.scrollY > SCROLL_THRESHOLD
}

function updateMobile() {
  isMobile.value = window.matchMedia('(max-width: 767px)').matches
}

function scrollToTop() {
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth'

  window.scrollTo({ top: 0, behavior })
}

onMounted(() => {
  updateMobile()
  checkScrollTop()

  const unbindStickyScroll = bindScrollListener()
  const onScroll = () => checkScrollTop()

  window.addEventListener('scroll', onScroll, { passive: true })

  const media = window.matchMedia('(max-width: 767px)')
  const onMediaChange = () => updateMobile()
  media.addEventListener('change', onMediaChange)

  onUnmounted(() => {
    unbindStickyScroll()
    window.removeEventListener('scroll', onScroll)
    media.removeEventListener('change', onMediaChange)
  })
})
</script>

<template>
  <Transition name="scroll-top">
    <button
      v-if="isVisible"
      type="button"
      class="scroll-top-btn"
      :class="{ 'scroll-top-btn--above-cta': offsetForStickyCta }"
      aria-label="Прокрутити вгору"
      @click="scrollToTop"
    >
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>
