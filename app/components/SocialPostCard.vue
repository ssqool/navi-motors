<script setup lang="ts">
import type { SocialPost } from '~/data/social-posts'

const props = defineProps<{
  post: SocialPost
}>()

const imageError = ref(false)

const placeholderSrc = computed(() =>
  props.post.platform === 'instagram'
    ? '/images/social/placeholder-instagram.svg'
    : '/images/social/placeholder-tiktok.svg',
)

const thumbnailSrc = computed(() => {
  if (imageError.value) return placeholderSrc.value
  if (props.post.thumbnailUrl) return props.post.thumbnailUrl
  return placeholderSrc.value
})

const platformLabel = computed(() =>
  props.post.platform === 'instagram' ? 'Instagram' : 'TikTok',
)

const { trackOutboundClick } = useAnalytics()

function onClick() {
  trackOutboundClick(props.post.platform, props.post.postUrl, 'social_card')
}
</script>

<template>
  <a
    :href="post.postUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="link-focus group block overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/40"
    @click="onClick"
  >
    <div class="relative aspect-square overflow-hidden bg-bg-soft">
      <img
        :src="thumbnailSrc"
        :alt="post.alt"
        width="400"
        height="400"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        @error="imageError = true"
      >

      <span
        class="absolute left-3 top-3 rounded-md px-2 py-1 text-xs font-semibold uppercase"
        :class="post.platform === 'instagram' ? 'bg-accent text-white' : 'bg-white text-black'"
      >
        {{ platformLabel }}
      </span>

      <span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/90 to-transparent p-3 md:hidden">
        <span class="text-xs font-medium text-text">Переглянути в {{ platformLabel }}</span>
      </span>

      <span class="absolute inset-0 hidden items-end bg-gradient-to-t from-bg/90 via-bg/20 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100 md:flex">
        <span class="text-sm font-medium text-text">Переглянути в {{ platformLabel }}</span>
      </span>
    </div>

    <div class="border-t border-border px-4 py-3">
      <p class="line-clamp-2 text-sm text-text-soft group-hover:text-accent">
        {{ post.caption }}
      </p>
    </div>
  </a>
</template>
