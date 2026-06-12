<script setup lang="ts">
import { homepageFaq } from '~/data/seo'
</script>

<template>
  <section class="section-padding" aria-labelledby="home-faq-title">
    <div class="container-narrow max-w-3xl">
      <UiReveal>
        <h2 id="home-faq-title" class="section-title">
          Часті запитання про СТО Navi Motors
        </h2>
        <p class="section-subtitle">
          Відповіді на популярні питання про автосервіс у Києві.
        </p>
      </UiReveal>

      <div class="mt-8">
        <UiReveal :delay="80">
          <UiFaqList :items="homepageFaq" />
        </UiReveal>
      </div>
    </div>
  </section>
</template>
