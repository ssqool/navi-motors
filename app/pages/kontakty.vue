<script setup lang="ts">
import { siteConfig } from '~/data/site'

definePageMeta({ layout: 'default' })

const breadcrumbs = [
  { name: 'Головна', path: '/' },
  { name: 'Контакти', path: '/kontakty' },
]

useSeo({
  title: 'Контакти Navi Motors — СТО на Віталія Скакуна, 26, Київ',
  description:
    'Контакти автосервісу Navi Motors: вул. Віталія Скакуна, 26, Київ, 02000. Телефон 098 535 50 80. Графік Пн–Сб 10:00–18:00. Запис на діагностику та ремонт авто.',
  path: '/kontakty',
})

import type { SocialPlatform } from '~/components/UiSocialIcon.vue'

type ContactItem = {
  title: string
  content: string
  type: 'text' | 'phone' | 'link' | 'external'
  href?: string
  platform?: SocialPlatform
}

const contactItems: ContactItem[] = [
  { title: 'Адреса', content: siteConfig.address, type: 'text' },
  { title: 'Телефон', href: `tel:${siteConfig.phone}`, content: siteConfig.phoneDisplay, type: 'phone' },
  { title: 'Графік', content: siteConfig.workingHours, type: 'text' },
  { title: 'Email', href: `mailto:${siteConfig.email}`, content: siteConfig.email, type: 'link' },
  { title: 'Telegram', href: siteConfig.telegram, content: 'Написати в Telegram', type: 'external', platform: 'telegram' },
  { title: 'Viber', href: siteConfig.viber, content: 'Написати у Viber', type: 'link', platform: 'viber' },
  { title: 'Instagram', href: siteConfig.instagram, content: siteConfig.instagramHandle, type: 'external', platform: 'instagram' },
  { title: 'TikTok', href: siteConfig.tiktok, content: siteConfig.tiktokHandle, type: 'external', platform: 'tiktok' },
]

const { trackPhoneClick, trackBookingClick, trackOutboundClick } = useAnalytics()

function onContactLinkClick(item: ContactItem) {
  if (item.type === 'phone') {
    trackPhoneClick('contacts_page')
    return
  }
  if (item.href) {
    trackOutboundClick(item.title.toLowerCase(), item.href, 'contacts_page')
  }
}
</script>

<template>
  <div>
    <SeoJsonLd page-type="contact" :breadcrumbs="breadcrumbs" />
    <UiBreadcrumbs :items="breadcrumbs" />
    <HeroSection
      title="Контакти Navi Motors"
      subtitle="Запишіться на діагностику або ремонт авто у Києві. Ми на вул. Віталія Скакуна, 26."
      :show-cta="false"
      compact
    />

    <section class="section-padding">
      <div class="container-narrow">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <UiReveal
            v-for="(item, index) in contactItems"
            :key="item.title"
            :delay="index * 50"
          >
            <div class="card-static h-full">
              <h2 class="flex items-center gap-2 text-sm font-heading uppercase tracking-wide text-text-muted">
                <UiSocialIcon v-if="item.platform" :platform="item.platform" class="h-4 w-4 text-accent" />
                {{ item.title }}
              </h2>
              <p v-if="item.type === 'text'" class="mt-2 text-text-soft">{{ item.content }}</p>
              <a
                v-else
                :href="item.href"
                :target="item.type === 'external' ? '_blank' : undefined"
                :rel="item.type === 'external' ? 'noopener noreferrer' : undefined"
                class="link-focus mt-2 block transition-colors hover:underline"
                :class="item.type === 'phone' ? 'text-xl text-accent' : 'text-accent'"
                @click="onContactLinkClick(item)"
              >
                {{ item.content }}
              </a>
            </div>
          </UiReveal>
        </div>

        <UiReveal :delay="80">
          <div class="mt-8 flex flex-wrap gap-4">
            <UiPhoneButton location="contacts_page" />
            <UiMapButton variant="primary" location="contacts_page" />
            <UiSocialLink
              platform="instagram"
              :href="siteConfig.instagram"
              label="Написати в Instagram"
              location="contacts_page"
              variant="button"
            />
            <UiSocialLink
              platform="tiktok"
              :href="siteConfig.tiktok"
              label="TikTok"
              location="contacts_page"
              variant="button"
            />
            <a href="#lead-form" class="btn-primary" @click="trackBookingClick('contacts_page')">
              Записатись онлайн
            </a>
          </div>
        </UiReveal>
      </div>
    </section>

    <MapSection />
    <LeadForm source-page="Контакти" />
  </div>
</template>
