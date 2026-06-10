<script setup lang="ts">
definePageMeta({ layout: 'default' })

const breadcrumbs = [
  { name: 'Головна', path: '/' },
  { name: 'Послуги', path: '/poslugy' },
]

useSeo({
  title: 'Послуги автосервісу у Києві — Navi Motors',
  description:
    'Послуги Navi Motors у Києві: діагностика авто, ТО, ремонт ходової, гальм, двигуна, трансмісії та рульового управління. Запис: 098 535 50 80.',
  path: '/poslugy',
})
</script>

<template>
  <div>
    <SeoJsonLd page-type="services" :breadcrumbs="breadcrumbs" />
    <UiBreadcrumbs :items="breadcrumbs" />
    <HeroSection
      title="Послуги автосервісу Navi Motors"
      subtitle="Navi Motors виконує діагностику, планове технічне обслуговування та ремонт авто у Києві. Працюємо з основними системами автомобіля: ходова, гальма, двигун, трансмісія, рульове управління та інші вузли."
      :show-cta="false"
      compact
    />
    <ServicesGrid />
    <LeadForm source-page="Послуги" />
  </div>
</template>
