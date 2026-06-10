<script setup lang="ts">
import { privacyPolicy } from '~/data/privacy'

definePageMeta({ layout: 'default' })

const breadcrumbs = [
  { name: 'Головна', path: '/' },
  { name: 'Політика конфіденційності', path: '/polityka-konfidentsiynosti' },
]

useSeo({
  title: privacyPolicy.metaTitle,
  description: privacyPolicy.metaDescription,
  path: '/polityka-konfidentsiynosti',
})
</script>

<template>
  <div>
    <SeoJsonLd :breadcrumbs="breadcrumbs" />
    <UiBreadcrumbs :items="breadcrumbs" />

    <section class="section-padding">
      <div class="container-narrow max-w-3xl">
        <UiReveal>
          <h1 class="section-title">Політика конфіденційності</h1>
          <p class="section-subtitle">
            Останнє оновлення: {{ privacyPolicy.updatedAt }}
          </p>
        </UiReveal>

        <div class="mt-10 space-y-10">
          <UiReveal
            v-for="(section, index) in privacyPolicy.sections"
            :key="section.title"
            :delay="index * 40"
          >
            <section>
              <h2 class="text-xl font-heading uppercase tracking-wide text-text-soft">
                {{ section.title }}
              </h2>
              <div class="mt-4 space-y-3 text-sm leading-relaxed text-text-muted">
                <p v-for="(paragraph, pIndex) in section.paragraphs" :key="pIndex">
                  {{ paragraph }}
                </p>
                <ul v-if="section.list" class="list-disc space-y-2 pl-5">
                  <li v-for="item in section.list" :key="item">
                    {{ item }}
                  </li>
                </ul>
                <p v-if="section.afterList">
                  {{ section.afterList }}
                </p>
              </div>
            </section>
          </UiReveal>
        </div>
      </div>
    </section>
  </div>
</template>
