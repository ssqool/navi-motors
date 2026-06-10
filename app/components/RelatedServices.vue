<script setup lang="ts">
import { services } from '~/data/services'
import type { Service } from '~/data/services'

const props = defineProps<{
  current: Service
}>()

const related = computed(() =>
  services
    .filter((s) => s.slug !== props.current.slug)
    .slice(0, 3),
)
</script>

<template>
  <section class="section-padding bg-bg-soft" aria-labelledby="related-services-title">
    <div class="container-narrow">
      <UiReveal>
        <h2 id="related-services-title" class="section-title">
          Інші послуги Navi Motors
        </h2>
        <p class="section-subtitle">
          Діагностика, ТО та ремонт авто у Києві — повний перелік послуг автосервісу.
        </p>
      </UiReveal>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UiReveal
          v-for="(service, index) in related"
          :key="service.slug"
          :delay="index * 60"
        >
          <ServiceCard :service="service" :index="index" />
        </UiReveal>
      </div>

      <UiReveal :delay="80">
        <div class="mt-8">
          <NuxtLink to="/poslugy" class="btn-secondary">
            Усі послуги автосервісу
          </NuxtLink>
        </div>
      </UiReveal>
    </div>
  </section>
</template>
