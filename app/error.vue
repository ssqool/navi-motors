<script setup lang="ts">
const error = useError()

useSeo({
  title: 'Сторінку не знайдено — Navi Motors',
  description: 'Запитана сторінка не існує. Поверніться на головну або перегляньте послуги автосервісу Navi Motors у Києві.',
  noindex: true,
  skipCanonical: true,
})
</script>

<template>
  <div class="section-padding">
    <div class="container-narrow text-center">
      <p class="text-6xl font-heading text-accent">{{ error?.statusCode ?? 404 }}</p>
      <h1 class="mt-4 text-3xl font-heading uppercase tracking-wide">
        Сторінку не знайдено
      </h1>
      <p class="mt-4 text-text-muted">
        Можливо, посилання застаріло. Спробуйте перейти на головну або до розділу послуг.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <NuxtLink to="/" class="btn-primary">
          На головну
        </NuxtLink>
        <NuxtLink to="/poslugy" class="btn-secondary">
          Послуги
        </NuxtLink>
        <NuxtLink to="/kontakty" class="btn-secondary">
          Контакти
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
