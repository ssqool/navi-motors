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

      <div class="mt-8 space-y-4">
        <UiReveal
          v-for="(item, index) in homepageFaq"
          :key="item.question"
          :delay="index * 50"
        >
          <UiFaqItem
            :question="item.question"
            :answer="item.answer"
          />
        </UiReveal>
      </div>
    </div>
  </section>
</template>
