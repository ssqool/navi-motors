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

const { trackPhoneClick, trackBookingClick, trackOutboundClick } = useAnalytics()

function onContactLinkClick(item: { type: string, title: string, href?: string }) {
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
            v-for="(item, index) in [
              { title: 'Адреса', content: siteConfig.address, type: 'text' },
              { title: 'Телефон', href: `tel:${siteConfig.phone}`, content: siteConfig.phoneDisplay, type: 'phone' },
              { title: 'Графік', content: siteConfig.workingHours, type: 'text' },
              { title: 'Email', href: `mailto:${siteConfig.email}`, content: siteConfig.email, type: 'link' },
              { title: 'Telegram', href: siteConfig.telegram, content: 'Написати в Telegram', type: 'external' },
              { title: 'Viber', href: siteConfig.viber, content: 'Написати у Viber', type: 'link' },
              { title: 'Instagram', href: siteConfig.instagram, content: siteConfig.instagramHandle, type: 'external' },
              { title: 'TikTok', href: siteConfig.tiktok, content: siteConfig.tiktokHandle, type: 'external' },
            ]"
            :key="item.title"
            :delay="index * 50"
          >
            <div class="card h-full">
              <h2 class="text-sm font-heading uppercase tracking-wide text-text-muted">{{ item.title }}</h2>
              <p v-if="item.type === 'text'" class="mt-2 text-text-soft">{{ item.content }}</p>
              <a
                v-else
                :href="item.href"
                :target="item.type === 'external' ? '_blank' : undefined"
                :rel="item.type === 'external' ? 'noopener noreferrer' : undefined"
                class="mt-2 block transition-colors hover:underline"
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
            <a
              :href="siteConfig.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary"
              @click="trackOutboundClick('instagram', siteConfig.instagram, 'contacts_page')"
            >
              Написати в Instagram
            </a>
            <a
              :href="siteConfig.tiktok"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary"
              @click="trackOutboundClick('tiktok', siteConfig.tiktok, 'contacts_page')"
            >
              TikTok
            </a>
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
