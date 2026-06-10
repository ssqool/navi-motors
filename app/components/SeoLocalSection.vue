<script setup lang="ts">
import { localSeoParagraphs } from '~/data/seo'
</script>

<template>
  <section class="section-padding" aria-labelledby="local-seo-title">
    <div class="container-narrow max-w-3xl">
      <UiReveal>
        <h2 id="local-seo-title" class="section-title">
          Автосервіс у Києві — Navi Motors
        </h2>
        <div class="mt-6 space-y-4 text-text-soft">
          <p v-for="(paragraph, index) in localSeoParagraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>
      </UiReveal>
    </div>
  </section>
</template>
