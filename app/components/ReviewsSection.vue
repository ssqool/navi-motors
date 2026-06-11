<script setup lang="ts">
import { reviews, reviewStats } from '~/data/reviews'
import { siteConfig } from '~/data/site'

const reviewsUrl = computed(() =>
  siteConfig.googleReviewsUrl || siteConfig.googleMaps,
)

const { trackOutboundClick } = useAnalytics()
</script>

<template>
  <section class="section-padding bg-bg-soft">
    <div class="container-narrow">
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <UiReveal>
          <h2 class="section-title">Відгуки клієнтів</h2>
          <p class="section-subtitle">
            Оцінки та відгуки з Google Maps.
          </p>
        </UiReveal>
        <UiReveal variant="slide-right" :delay="80">
          <div class="flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-3">
            <span class="text-3xl font-heading text-accent">{{ reviewStats.averageRating }}</span>
            <div>
              <div class="flex gap-0.5 text-accent">
                <svg v-for="i in 5" :key="i" class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p class="text-xs text-text-muted">{{ reviewStats.totalCount }} відгуків · {{ reviewStats.source }}</p>
            </div>
          </div>
        </UiReveal>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UiReveal
          v-for="(review, index) in reviews"
          :key="review.author + review.date"
          :delay="index * 60"
        >
          <article class="card-static h-full">
            <div class="mb-3 flex items-center justify-between gap-2">
              <div class="flex items-center gap-1 text-accent" :aria-label="`Оцінка ${review.rating} з 5`">
                <svg v-for="i in review.rating" :key="i" class="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <span v-if="review.service" class="text-xs text-text-muted">{{ review.service }}</span>
            </div>
            <p class="text-sm text-text-soft">"{{ review.text }}"</p>
            <p class="mt-4 text-xs text-text-muted">
              {{ review.author }} · {{ review.date }}
            </p>
          </article>
        </UiReveal>
      </div>

      <UiReveal :delay="100">
        <div class="mt-8 flex flex-wrap gap-4">
          <a
            :href="reviewsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary"
            @click="trackOutboundClick('google_reviews', reviewsUrl, 'reviews_section')"
          >
            Дивитись всі відгуки в Google
          </a>
          <a
            :href="reviewsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary"
            @click="trackOutboundClick('google_reviews_write', reviewsUrl, 'reviews_section')"
          >
            Залишити відгук
          </a>
        </div>
      </UiReveal>
    </div>
  </section>
</template>
