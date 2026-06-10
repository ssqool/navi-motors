<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeo({
  title: 'Послуги Navi Motors — ремонт та обслуговування авто у Києві',
  description:
    'Послуги Navi Motors: діагностика авто, технічне обслуговування, ремонт ходової, гальмівної системи, двигуна, трансмісії та рульового управління у Києві.',
  path: '/poslugy',
})
</script>

<template>
  <div>
    <SeoJsonLd />
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
