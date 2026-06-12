<script setup lang="ts">
import { siteConfig } from '~/data/site'

const { trackPhoneClick, trackMapClick } = useAnalytics()
</script>

<template>
  <section class="section-padding">
    <div class="container-narrow">
      <UiReveal>
        <h2 class="section-title">Контакти та розташування</h2>
        <p class="section-subtitle">
          {{ siteConfig.address }}
        </p>
      </UiReveal>

      <div class="mt-10 grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <UiReveal>
          <div class="space-y-6">
            <div class="card-static">
              <h3 class="text-sm font-heading uppercase tracking-wide text-text-muted">Адреса</h3>
              <p class="mt-2 text-text-soft">{{ siteConfig.address }}</p>
            </div>
            <div class="card-static">
              <h3 class="text-sm font-heading uppercase tracking-wide text-text-muted">Телефон</h3>
              <a
                :href="`tel:${siteConfig.phone}`"
                class="mt-2 block text-lg text-accent transition-colors hover:underline"
                @click="trackPhoneClick('map_section')"
              >
                {{ siteConfig.phoneDisplay }}
              </a>
            </div>
            <div class="card-static">
              <h3 class="text-sm font-heading uppercase tracking-wide text-text-muted">Графік роботи</h3>
              <p class="mt-2 text-text-soft">{{ siteConfig.workingHours }}</p>
            </div>
            <div class="flex flex-wrap gap-4">
              <UiPhoneButton location="map_section" />
              <UiMapButton location="map_section" />
              <UiSocialLink platform="telegram" :href="siteConfig.telegram" label="Telegram" location="map_section" variant="button" />
              <UiSocialLink platform="viber" :href="siteConfig.viber" label="Viber" location="map_section" variant="button" :external="false" />
              <UiSocialLink platform="instagram" :href="siteConfig.instagram" label="Instagram" location="map_section" variant="button" />
              <UiSocialLink platform="tiktok" :href="siteConfig.tiktok" label="TikTok" location="map_section" variant="button" />
            </div>
          </div>
        </UiReveal>

        <UiReveal variant="slide-right" :delay="100" class="h-full min-h-[400px]">
          <div class="h-full min-h-[400px] overflow-hidden rounded-xl border border-border transition-shadow duration-300 hover:shadow-xl hover:shadow-black/20">
            <iframe
              :src="siteConfig.googleMapsEmbed"
              width="100%"
              height="100%"
              class="h-full w-full"
              style="border:0"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Navi Motors на Google Maps"
            />
          </div>
        </UiReveal>
      </div>
    </div>
  </section>
</template>
