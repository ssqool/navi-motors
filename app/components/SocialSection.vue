<script setup lang="ts">
import { siteConfig } from '~/data/site'
import { socialPosts } from '~/data/social-posts'

const { trackOutboundClick } = useAnalytics()
</script>

<template>
  <section class="section-padding">
    <div class="container-narrow">
      <UiReveal>
        <h2 class="section-title">Navi Motors у соцмережах</h2>
        <p class="section-subtitle">
          Реальні ремонти, короткі відео з процесу та приклади робіт — в Instagram і TikTok Navi Motors.
        </p>
      </UiReveal>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <UiReveal
          v-for="(post, index) in socialPosts"
          :key="post.id"
          :delay="index * 70"
        >
          <SocialPostCard :post="post" />
        </UiReveal>
      </div>

      <UiReveal :delay="80">
        <div class="mt-8 flex flex-wrap gap-4">
          <a
            :href="siteConfig.instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary"
            @click="trackOutboundClick('instagram', siteConfig.instagram, 'social_section')"
          >
            Instagram
          </a>
          <a
            :href="siteConfig.tiktok"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary"
            @click="trackOutboundClick('tiktok', siteConfig.tiktok, 'social_section')"
          >
            TikTok
          </a>
        </div>
      </UiReveal>
    </div>
  </section>
</template>
