<script setup lang="ts">
import { getServiceBySlug } from '~/data/services'
import { serviceHeroImages } from '~/data/gallery'

definePageMeta({ layout: 'default' })

const route = useRoute()
const slug = route.params.slug as string
const service = getServiceBySlug(slug)

if (!service) {
  throw createError({ statusCode: 404, statusMessage: 'Послугу не знайдено' })
}

const breadcrumbs = [
  { name: 'Головна', path: '/' },
  { name: 'Послуги', path: '/poslugy' },
  { name: service.title, path: `/poslugy/${service.slug}` },
]

useSeo({
  title: service.metaTitle,
  description: service.metaDescription,
  path: `/poslugy/${service.slug}`,
  ogType: 'article',
})
</script>

<template>
  <article>
    <SeoJsonLd
      page-type="service"
      :service="service"
      :breadcrumbs="breadcrumbs"
    />
    <UiBreadcrumbs :items="breadcrumbs" />
    <HeroSection
      :title="service.h1"
      :subtitle="service.heroText"
      :image="serviceHeroImages[service.slug]"
      :show-cta="true"
    />

    <section class="section-padding">
      <div class="container-narrow grid gap-12 lg:grid-cols-2">
        <UiReveal>
          <h2 class="text-2xl font-heading uppercase tracking-wide">Що входить у послугу</h2>
          <ul class="mt-6 space-y-3">
            <li v-for="item in service.includes" :key="item" class="flex items-start gap-3 text-text-soft">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {{ item }}
            </li>
          </ul>
        </UiReveal>
        <UiReveal variant="slide-right" :delay="80">
          <h2 class="text-2xl font-heading uppercase tracking-wide">Коли потрібно звернутись</h2>
          <ul class="mt-6 space-y-3">
            <li v-for="item in service.whenToVisit" :key="item" class="flex items-start gap-3 text-text-soft">
              <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {{ item }}
            </li>
          </ul>
        </UiReveal>
      </div>
    </section>

    <section class="section-padding bg-bg-soft">
      <div class="container-narrow">
        <UiReveal>
          <h2 class="section-title">Як проходить робота</h2>
        </UiReveal>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <UiReveal
            v-for="(step, index) in service.process"
            :key="step.step"
            :delay="index * 70"
          >
            <div class="card h-full">
              <span class="text-3xl font-heading text-accent">{{ step.step }}</span>
              <h3 class="mt-3 text-base font-heading uppercase tracking-wide">{{ step.title }}</h3>
              <p class="mt-2 text-sm text-text-muted">{{ step.description }}</p>
            </div>
          </UiReveal>
        </div>
      </div>
    </section>

    <section class="section-padding">
      <div class="container-narrow text-center">
        <UiReveal>
          <h2 class="section-title">Орієнтовна ціна</h2>
          <p class="mt-4 text-3xl font-heading text-accent">{{ service.price }}</p>
          <p class="mt-4 text-sm text-text-muted">
            Точна вартість залежить від моделі авто, стану деталей та складності робіт у нашому автосервісі у Києві.
          </p>
        </UiReveal>
      </div>
    </section>

    <section v-if="service.faq.length" class="section-padding bg-bg-soft">
      <div class="container-narrow max-w-3xl">
        <UiReveal>
          <h2 class="section-title">Часті запитання</h2>
        </UiReveal>
        <div class="mt-8 space-y-4">
          <UiReveal
            v-for="(item, index) in service.faq"
            :key="item.question"
            :delay="index * 50"
          >
            <details class="card group">
              <summary class="cursor-pointer font-medium text-text-soft marker:content-none">
                <span class="flex items-center justify-between gap-4">
                  {{ item.question }}
                  <svg class="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <p class="mt-4 text-sm text-text-muted">{{ item.answer }}</p>
            </details>
          </UiReveal>
        </div>
      </div>
    </section>

    <RelatedServices :current="service" />
    <LeadForm :source-page="service.title" />
  </article>
</template>
