<template>
  <div class="flex min-h-screen flex-col">
    <a href="#main-content" class="skip-link">Перейти до основного вмісту</a>
    <AppHeader />
    <main id="main-content" class="flex-1 pb-20 md:pb-0">
      <slot />
    </main>
    <AppFooter />
    <AppStickyCta />
    <AppScrollTop />
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  document.documentElement.classList.add('js-reveal')
})
</script>
