<script setup lang="ts">
import { siteConfig } from '~/data/site'
</script>

<template>
  <footer class="border-t border-border bg-bg-soft">
    <div class="container-narrow section-padding pb-8">
      <div class="grid gap-10 md:grid-cols-3">
        <div>
          <img src="/images/logo/logo-main.svg" alt="Navi Motors" class="mb-4 h-12" width="180" height="48">
          <p class="text-sm text-text-muted">
            {{ siteConfig.tagline }}. Діагностика, ТО та ремонт авто у Києві.
          </p>
        </div>

        <div>
          <h3 class="mb-4 text-sm font-heading uppercase tracking-wide text-text-soft">
            Навігація
          </h3>
          <ul class="space-y-2 text-sm text-text-muted">
            <li><NuxtLink to="/" class="hover:text-accent">Головна</NuxtLink></li>
            <li><NuxtLink to="/poslugy" class="hover:text-accent">Послуги</NuxtLink></li>
            <li><NuxtLink to="/kontakty" class="hover:text-accent">Контакти</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 text-sm font-heading uppercase tracking-wide text-text-soft">
            Контакти
          </h3>
          <ul class="space-y-2 text-sm text-text-muted">
            <li>{{ siteConfig.address }}</li>
            <li>
              <a :href="`tel:${siteConfig.phone}`" class="hover:text-accent">
                {{ siteConfig.phoneDisplay }}
              </a>
            </li>
            <li>{{ siteConfig.workingHours }}</li>
            <li>
              <a :href="siteConfig.instagram" target="_blank" rel="noopener noreferrer" class="hover:text-accent">
                {{ siteConfig.instagramHandle }}
              </a>
            </li>
            <li>
              <a :href="siteConfig.tiktok" target="_blank" rel="noopener noreferrer" class="hover:text-accent">
                {{ siteConfig.tiktokHandle }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-text-muted md:flex-row">
        <p>&copy; {{ new Date().getFullYear() }} {{ siteConfig.name }}. Усі права захищені.</p>
        <p>KYIV CAR SERVICE</p>
      </div>
    </div>
  </footer>
</template>
