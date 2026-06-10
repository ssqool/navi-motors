<script setup lang="ts">
const route = useRoute()
const isMenuOpen = ref(false)

const navLinks = [
  { label: 'Послуги', to: '/poslugy' },
  { label: 'Контакти', to: '/kontakty' },
]

function isActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}

watch(() => route.path, () => {
  isMenuOpen.value = false
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-md">
    <div class="container-narrow flex h-16 items-center justify-between md:h-20">
      <NuxtLink to="/" class="flex items-center gap-3 transition-opacity hover:opacity-80" aria-label="Navi Motors — головна">
        <img src="/images/logo/logo-horizontal.svg" alt="Navi Motors" class="h-8 md:h-10" width="160" height="40">
      </NuxtLink>

      <nav class="hidden items-center gap-8 md:flex" aria-label="Головна навігація">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="isActive(link.to) ? 'nav-link-active text-accent' : 'text-text-soft'"
        >
          {{ link.label }}
        </NuxtLink>
        <UiPhoneButton variant="primary" size="sm" />
      </nav>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg border border-border p-2 text-text transition-colors hover:border-accent/40 hover:text-accent md:hidden"
        :aria-expanded="isMenuOpen"
        aria-controls="mobile-menu"
        aria-label="Відкрити меню"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg v-if="!isMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <Transition name="menu">
      <div
        v-if="isMenuOpen"
        id="mobile-menu"
        class="border-t border-border bg-bg-soft md:hidden"
      >
        <nav class="container-narrow flex flex-col gap-4 py-4" aria-label="Мобільна навігація">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-base font-medium transition-colors hover:text-accent"
            :class="isActive(link.to) ? 'text-accent' : 'text-text-soft'"
          >
            {{ link.label }}
          </NuxtLink>
          <UiPhoneButton variant="primary" class="w-full" />
        </nav>
      </div>
    </Transition>
  </header>
</template>
