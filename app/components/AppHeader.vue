<script setup lang="ts">
import { siteConfig } from '~/data/site'

const navLinks = [
  { label: 'Послуги', to: '/poslugy' },
  { label: 'Про нас', to: '/pro-nas' },
  { label: 'Контакти', to: '/kontakty' },
]

const route = useRoute()
const isMenuOpen = ref(false)
const { trackPhoneClick } = useAnalytics()

function isActive(path: string) {
  return route.path === path || route.path.startsWith(`${path}/`)
}

watch(() => route.path, () => {
  isMenuOpen.value = false
})

watch(isMenuOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

onUnmounted(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur-md">
    <div class="container-narrow flex h-16 items-center justify-between gap-3 md:h-20">
      <NuxtLink to="/" class="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-80" aria-label="Navi Motors — головна">
        <img src="/logo.svg" alt="Navi Motors" class="h-10 w-10 md:h-11 md:w-11" width="44" height="44">
      </NuxtLink>

      <nav class="hidden items-center gap-6 lg:gap-8 md:flex" aria-label="Головна навігація">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :class="isActive(link.to) ? 'nav-link-active text-accent' : 'text-text-soft'"
          :aria-current="isActive(link.to) ? 'page' : undefined"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-2 sm:gap-3">
        <UiBookingButton class="hidden sm:inline-flex" location="header" />
        <UiPhoneButton variant="secondary" size="sm" class="hidden md:inline-flex" location="header" />

        <UiBookingButton size="sm" class="sm:hidden" location="header" />

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
    </div>

    <Teleport to="body">
      <Transition name="menu-backdrop">
        <button
          v-if="isMenuOpen"
          type="button"
          class="fixed inset-0 top-16 z-[90] bg-bg/80 backdrop-blur-sm md:hidden"
          aria-label="Закрити меню"
          @click="isMenuOpen = false"
        />
      </Transition>

      <Transition name="menu">
        <div
          v-if="isMenuOpen"
          id="mobile-menu"
          class="fixed inset-x-0 top-16 z-[100] max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-border bg-bg-soft shadow-lg md:hidden"
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
            <UiBookingButton class="w-full" location="header_mobile_menu" />
            <UiPhoneButton variant="secondary" class="w-full" location="header_mobile_menu" />
            <a
              :href="`tel:${siteConfig.phone}`"
              class="text-center text-sm text-text-muted"
              @click="trackPhoneClick('header_mobile_menu')"
            >
              {{ siteConfig.phoneDisplay }}
            </a>
          </nav>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>
