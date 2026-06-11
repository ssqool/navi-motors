<script setup lang="ts">
import { siteConfig } from '~/data/site'

const { trackPhoneClick, trackMapClick, trackOutboundClick } = useAnalytics()
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

      <div class="mt-10 grid gap-8 lg:grid-cols-2">
        <UiReveal>
          <div class="space-y-6">
            <div class="card">
              <h3 class="text-sm font-heading uppercase tracking-wide text-text-muted">Адреса</h3>
              <p class="mt-2 text-text-soft">{{ siteConfig.address }}</p>
            </div>
            <div class="card">
              <h3 class="text-sm font-heading uppercase tracking-wide text-text-muted">Телефон</h3>
              <a
                :href="`tel:${siteConfig.phone}`"
                class="mt-2 block text-lg text-accent transition-colors hover:underline"
                @click="trackPhoneClick('map_section')"
              >
                {{ siteConfig.phoneDisplay }}
              </a>
            </div>
            <div class="card">
              <h3 class="text-sm font-heading uppercase tracking-wide text-text-muted">Графік роботи</h3>
              <p class="mt-2 text-text-soft">{{ siteConfig.workingHours }}</p>
            </div>
            <div class="flex flex-wrap gap-4">
              <UiPhoneButton location="map_section" />
              <UiMapButton location="map_section" />
              <a
                :href="siteConfig.telegram"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary"
                @click="trackOutboundClick('telegram', siteConfig.telegram, 'map_section')"
              >
                Telegram
              </a>
              <a :href="siteConfig.viber" class="btn-secondary" @click="trackOutboundClick('viber', siteConfig.viber, 'map_section')">
                Viber
              </a>
              <a
                :href="siteConfig.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary"
                @click="trackOutboundClick('instagram', siteConfig.instagram, 'map_section')"
              >
                Instagram
              </a>
              <a
                :href="siteConfig.tiktok"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary"
                @click="trackOutboundClick('tiktok', siteConfig.tiktok, 'map_section')"
              >
                TikTok
              </a>
            </div>
          </div>
        </UiReveal>

        <UiReveal variant="slide-right" :delay="100">
          <div class="min-h-[400px] overflow-hidden rounded-xl border border-border transition-shadow duration-300 hover:shadow-xl hover:shadow-black/20">
            <iframe
              :src="siteConfig.googleMapsEmbed"
              width="100%"
              height="100%"
              class="min-h-[400px] w-full"
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
