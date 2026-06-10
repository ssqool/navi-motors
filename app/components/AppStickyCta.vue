<script setup lang="ts">
const isVisible = ref(false)

function onScroll() {
  isVisible.value = window.scrollY > 420
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Transition name="sticky-cta">
    <div
      v-if="isVisible"
      class="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 p-3 backdrop-blur-md md:hidden"
      role="region"
      aria-label="Швидкий запис"
    >
      <div class="container-narrow flex gap-3">
        <UiPhoneButton variant="secondary" class="w-full flex-1" />
        <UiBookingButton class="w-full flex-1" />
      </div>
    </div>
  </Transition>
</template>
