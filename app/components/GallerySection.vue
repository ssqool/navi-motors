<script setup lang="ts">
import { galleryImages } from '~/data/gallery'
</script>

<template>
  <section class="section-padding bg-bg-soft">
    <div class="container-narrow">
      <UiReveal>
        <h2 class="section-title">Фото сервісу</h2>
        <p class="section-subtitle">
          Бокси, обладнання та процес роботи в Navi Motors на вул. Віталія Скакуна, 26.
        </p>
      </UiReveal>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <UiReveal
          v-for="(image, index) in galleryImages"
          :key="image.id"
          :delay="(index % 3) * 70"
        >
          <figure class="group overflow-hidden rounded-xl border border-border bg-surface">
            <img
              :src="image.src"
              :alt="image.alt"
              width="600"
              height="450"
              loading="lazy"
              decoding="async"
              class="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            >
            <figcaption class="px-4 py-3 text-sm text-text-muted transition-colors group-hover:text-text-soft">
              {{ image.caption }}
            </figcaption>
          </figure>
        </UiReveal>
      </div>
    </div>
  </section>
</template>
