<script setup lang="ts">
const { progress, isLoading } = useLoadingIndicator({
  duration: 1600,
  throttle: 120,
  hideDelay: 280,
  resetDelay: 320,
})

const visible = ref(false)
let hideTimer: ReturnType<typeof setTimeout> | undefined

watch(isLoading, (loading) => {
  if (hideTimer) clearTimeout(hideTimer)

  if (loading) {
    visible.value = true
    return
  }

  hideTimer = setTimeout(() => {
    visible.value = false
  }, 320)
})

onUnmounted(() => {
  if (hideTimer) clearTimeout(hideTimer)
})
</script>

<template>
  <div
    class="page-loader"
    :class="{ 'page-loader--visible': visible, 'page-loader--loading': isLoading }"
    aria-hidden="true"
  >
    <div
      class="page-loader__track"
      :style="{ transform: `scaleX(${progress / 100})` }"
    />
  </div>
</template>
