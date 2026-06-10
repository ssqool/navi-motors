<script setup lang="ts">
import type { BreadcrumbItem } from '~/composables/useStructuredData'

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <nav aria-label="Навігаційний ланцюжок" class="border-b border-border bg-bg-soft">
    <div class="container-narrow py-3">
      <ol class="flex flex-wrap items-center gap-1 text-sm text-text-muted">
        <li
          v-for="(item, index) in items"
          :key="item.path"
          class="flex items-center gap-1"
        >
          <NuxtLink
            v-if="index < items.length - 1"
            :to="item.path"
            class="transition-colors hover:text-accent"
          >
            {{ item.name }}
          </NuxtLink>
          <span
            v-else
            class="text-text-soft"
            aria-current="page"
          >
            {{ item.name }}
          </span>
          <span
            v-if="index < items.length - 1"
            class="text-border"
            aria-hidden="true"
          >
            /
          </span>
        </li>
      </ol>
    </div>
  </nav>
</template>
