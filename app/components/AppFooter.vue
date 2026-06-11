<script setup lang="ts">
import { siteConfig } from '~/data/site'
import { services } from '~/data/services'
</script>

<template>
  <footer class="border-t border-border bg-bg-soft">
    <div class="container-narrow section-padding pb-8">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/logo.svg" alt="Navi Motors — автосервіс у Києві" class="mb-4 h-24 w-24" width="96" height="96">
          <p class="text-sm text-text-muted">
            {{ siteConfig.tagline }}. Діагностика, ТО та ремонт авто у Києві на вул. Віталія Скакуна, 26.
          </p>
        </div>

        <div>
          <h3 class="mb-4 text-sm font-heading uppercase tracking-wide text-text-soft">
            Навігація
          </h3>
          <ul class="space-y-2 text-sm text-text-muted">
            <li><NuxtLink to="/" class="hover:text-accent">Головна</NuxtLink></li>
            <li><NuxtLink to="/poslugy" class="hover:text-accent">Послуги</NuxtLink></li>
            <li><NuxtLink to="/pro-nas" class="hover:text-accent">Про нас</NuxtLink></li>
            <li><NuxtLink to="/kontakty" class="hover:text-accent">Контакти</NuxtLink></li>
            <li><NuxtLink to="/#lead-form" class="hover:text-accent">Запис на ремонт</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 text-sm font-heading uppercase tracking-wide text-text-soft">
            Послуги у Києві
          </h3>
          <ul class="space-y-2 text-sm text-text-muted">
            <li v-for="service in services" :key="service.slug">
              <NuxtLink :to="`/poslugy/${service.slug}`" class="hover:text-accent">
                {{ service.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 text-sm font-heading uppercase tracking-wide text-text-soft">
            Контакти
          </h3>
          <address class="space-y-2 text-sm not-italic text-text-muted">
            <p>{{ siteConfig.address }}</p>
            <p>
              <a :href="`tel:${siteConfig.phone}`" class="hover:text-accent">
                {{ siteConfig.phoneDisplay }}
              </a>
            </p>
            <p>{{ siteConfig.workingHours }}</p>
            <p>
              <a :href="siteConfig.instagram" target="_blank" rel="noopener noreferrer" class="hover:text-accent">
                {{ siteConfig.instagramHandle }}
              </a>
            </p>
            <p>
              <a :href="siteConfig.tiktok" target="_blank" rel="noopener noreferrer" class="hover:text-accent">
                {{ siteConfig.tiktokHandle }}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-text-muted md:flex-row">
        <div class="flex flex-col items-center gap-2 md:items-start">
          <p>&copy; {{ new Date().getFullYear() }} {{ siteConfig.name }}. Усі права захищені.</p>
          <NuxtLink to="/polityka-konfidentsiynosti" class="hover:text-accent">
            Політика конфіденційності
          </NuxtLink>
        </div>
        <p>Автосервіс у Києві · вул. Віталія Скакуна, 26</p>
      </div>
    </div>
  </footer>
</template>
