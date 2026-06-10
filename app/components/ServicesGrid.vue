<script setup lang="ts">
import { services } from '~/data/services'

interface Props {
  limit?: number
  showAllLink?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  limit: undefined,
  showAllLink: false,
})

const FEATURED_SLUG = 'diagnostyka-avto-kyiv'

const displayedServices = computed(() =>
  props.limit ? services.slice(0, props.limit) : services,
)
</script>

<template>
  <section class="section-padding bg-bg-soft">
    <div class="container-narrow">
      <UiReveal class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 class="section-title">Основні послуги</h2>
          <p class="section-subtitle">
            Діагностика, технічне обслуговування та ремонт основних систем автомобіля.
          </p>
        </div>
        <NuxtLink v-if="showAllLink" to="/poslugy" class="btn-secondary shrink-0">
          Усі послуги
        </NuxtLink>
      </UiReveal>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <UiReveal
          v-for="(service, index) in displayedServices"
          :key="service.slug"
          :delay="index * 60"
          :class="service.slug === FEATURED_SLUG ? 'sm:col-span-2 lg:col-span-2' : ''"
        >
          <ServiceCard
            :service="service"
            :index="index"
            :featured="service.slug === FEATURED_SLUG"
          />
        </UiReveal>
      </div>
    </div>
  </section>
</template>
