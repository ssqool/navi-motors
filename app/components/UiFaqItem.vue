<script setup lang="ts">
const props = defineProps<{
  question: string
  answer: string
}>()

const { trackFaqExpand } = useAnalytics()

function onToggle(event: Event) {
  const details = event.target as HTMLDetailsElement
  if (details.open) trackFaqExpand(props.question)
}
</script>

<template>
  <details class="card-static group" @toggle="onToggle">
    <summary class="faq-summary">
      {{ question }}
      <svg
        class="h-5 w-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </summary>
    <p class="faq-answer">
      {{ answer }}
    </p>
  </details>
</template>
