<script setup lang="ts">
const barRef = ref<HTMLElement | null>(null)
const { isBarVisible, setBarHeight, bindScrollListener } = useMobileStickyCta()

function measureBar() {
  const height = barRef.value?.offsetHeight
  if (height) setBarHeight(height)
}

onMounted(() => {
  const unbindScroll = bindScrollListener()

  watch(isBarVisible, (visible) => {
    if (visible) nextTick(measureBar)
  }, { immediate: true })

  watch(barRef, (el, _, onCleanup) => {
    if (!el) return
    measureBar()
    const resizeObserver = new ResizeObserver(measureBar)
    resizeObserver.observe(el)
    onCleanup(() => resizeObserver.disconnect())
  })

  onUnmounted(unbindScroll)
})
</script>

<template>
  <Transition name="sticky-cta">
    <div
      v-if="isBarVisible"
      ref="barRef"
      class="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
      data-sticky-cta
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
