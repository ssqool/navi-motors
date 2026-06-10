<script setup lang="ts">
withDefaults(defineProps<{
  size?: 'sm' | 'md'
}>(), {
  size: 'sm',
})
</script>

<template>
  <span
    class="ui-spinner inline-block shrink-0 rounded-full border-2 border-current border-r-transparent"
    :class="size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'"
    aria-hidden="true"
  />
</template>
