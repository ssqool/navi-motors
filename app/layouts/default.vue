<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="flex-1 pb-20 md:pb-0">
      <slot />
    </main>
    <AppFooter />
    <AppStickyCta />
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  document.documentElement.classList.add('js-reveal')
})
</script>
