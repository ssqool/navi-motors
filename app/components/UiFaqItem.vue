<script setup lang="ts">
const props = defineProps<{
  question: string
  answer: string
}>()

const isOpen = ref(false)
const { trackFaqExpand } = useAnalytics()

function toggle() {
  isOpen.value = !isOpen.value
  if (isOpen.value) trackFaqExpand(props.question)
}
</script>

<template>
  <div class="faq-item card-static-flush">
    <button
      type="button"
      class="faq-summary w-full text-left"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      {{ question }}
      <svg
        class="h-5 w-5 shrink-0 text-accent transition-transform duration-300"
        :class="isOpen ? 'rotate-180' : ''"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div
      class="faq-content"
      :class="isOpen ? 'faq-content--open' : ''"
    >
      <div class="faq-content-inner">
        <p class="faq-answer">
          {{ answer }}
        </p>
      </div>
    </div>
  </div>
</template>
