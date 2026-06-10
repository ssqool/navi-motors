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
          <details class="card group">
            <summary class="cursor-pointer font-medium text-text-soft marker:content-none">
              <span class="flex items-center justify-between gap-4">
                {{ item.question }}
                <svg class="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </summary>
            <p class="mt-4 text-sm text-text-muted">
              {{ item.answer }}
            </p>
          </details>
        </UiReveal>
      </div>
    </div>
  </section>
</template>
