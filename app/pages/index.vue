<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeo({
  title: 'Navi Motors — СТО у Києві | Ремонт авто та діагностика',
  description:
    'Navi Motors — автосервіс у Києві на вул. Віталія Скакуна, 26. Діагностика, ТО, ремонт ходової, гальмівної системи, двигуна та трансмісії. Запис телефоном або онлайн.',
  path: '/',
})
</script>

<template>
  <div>
    <SeoJsonLd />
    <HeroSection
      title="СТО Navi Motors у Києві"
      subtitle="Діагностика, технічне обслуговування та ремонт авто під ключ. Пояснюємо проблему, погоджуємо вартість до початку робіт і виконуємо ремонт без зайвих питань."
    />
    <ServicesGrid :limit="8" show-all-link />
    <BenefitsSection />
    <PriceTable />
    <GallerySection />
    <ReviewsSection />
    <LeadForm source-page="Головна" />
    <MapSection />
    <SocialSection />
  </div>
</template>
