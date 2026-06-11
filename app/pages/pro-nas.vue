<script setup lang="ts">
import { aboutContent } from '~/data/about'
import { pageHeroImages } from '~/data/gallery'
import { siteConfig } from '~/data/site'

definePageMeta({ layout: 'default' })

const breadcrumbs = [
  { name: 'Головна', path: '/' },
  { name: 'Про нас', path: '/pro-nas' },
]

useSeo({
  title: aboutContent.metaTitle,
  description: aboutContent.metaDescription,
  path: '/pro-nas',
})
</script>

<template>
  <div>
    <SeoJsonLd :breadcrumbs="breadcrumbs" />
    <UiBreadcrumbs :items="breadcrumbs" />
    <HeroSection
      :title="aboutContent.heroTitle"
      :subtitle="aboutContent.heroSubtitle"
      :image="pageHeroImages.about.src"
      :image-alt="pageHeroImages.about.alt"
      :image-position="pageHeroImages.about.position"
      :show-cta="true"
      compact
    />

    <section class="section-padding">
      <div class="container-narrow max-w-3xl">
        <UiReveal>
          <div class="space-y-4 text-text-soft">
            <p v-for="(paragraph, index) in aboutContent.intro" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </UiReveal>

        <UiReveal :delay="80">
          <div class="mt-12 grid gap-6 sm:grid-cols-3">
            <div
              v-for="stat in aboutContent.stats"
              :key="stat.label"
              class="card-static text-center"
            >
              <p class="text-3xl font-heading text-accent">{{ stat.value }}</p>
              <p class="mt-2 text-sm text-text-muted">{{ stat.label }}</p>
            </div>
          </div>
        </UiReveal>
      </div>
    </section>

    <section class="section-padding bg-bg-soft">
      <div class="container-narrow">
        <UiReveal>
          <h2 class="section-title">Наші принципи</h2>
          <p class="section-subtitle">
            Як ми працюємо з клієнтами в автосервісі Navi Motors у Києві.
          </p>
        </UiReveal>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <UiReveal
            v-for="(value, index) in aboutContent.values"
            :key="value.title"
            :delay="index * 60"
          >
            <div class="card-static h-full">
              <h3 class="text-base font-heading uppercase tracking-wide">{{ value.title }}</h3>
              <p class="mt-2 text-sm text-text-muted">{{ value.description }}</p>
            </div>
          </UiReveal>
        </div>
      </div>
    </section>

    <section class="section-padding">
      <div class="container-narrow text-center">
        <UiReveal>
          <h2 class="section-title">Де нас знайти</h2>
          <p class="section-subtitle mx-auto">
            {{ siteConfig.address }} · {{ siteConfig.workingHours }}
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <UiBookingButton location="about_page" />
            <UiPhoneButton variant="secondary" location="about_page" />
            <NuxtLink to="/poslugy" class="btn-secondary">
              Наші послуги
            </NuxtLink>
          </div>
        </UiReveal>
      </div>
    </section>

    <LeadForm source-page="Про нас" />
  </div>
</template>
