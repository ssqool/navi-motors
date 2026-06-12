<script setup lang="ts">
export interface FaqListItem {
  question: string
  answer: string
}

const props = defineProps<{
  items: readonly FaqListItem[]
}>()

const activeIndex = ref<number | null>(null)
const answerHeights = ref<number[]>([])
const listRef = ref<HTMLElement | null>(null)
const measureRef = ref<HTMLElement | null>(null)
const listId = useId()
const { trackFaqExpand } = useAnalytics()

const reservedHeight = computed(() => {
  if (!answerHeights.value.length) return 0
  return Math.max(...answerHeights.value)
})

const reserveHeight = computed(() => {
  if (activeIndex.value === null) return reservedHeight.value

  const openHeight = answerHeights.value[activeIndex.value] ?? 0
  return Math.max(0, reservedHeight.value - openHeight)
})

function panelId(index: number) {
  return `${listId}-panel-${index}`
}

function triggerId(index: number) {
  return `${listId}-trigger-${index}`
}

function slotHeight(index: number) {
  return answerHeights.value[index] ?? 0
}

function toggle(index: number) {
  if (activeIndex.value === index) {
    activeIndex.value = null
    return
  }

  activeIndex.value = index
  trackFaqExpand(props.items[index]!.question)
}

function measureAnswerHeights() {
  if (!measureRef.value) return

  const blocks = measureRef.value.querySelectorAll('[data-faq-measure]')
  const heights: number[] = []

  blocks.forEach((element) => {
    heights.push(Math.ceil((element as HTMLElement).getBoundingClientRect().height))
  })

  if (heights.length) answerHeights.value = heights
}

let resizeObserver: ResizeObserver | undefined

onMounted(async () => {
  await nextTick()
  measureAnswerHeights()

  if (listRef.value) {
    resizeObserver = new ResizeObserver(() => {
      measureAnswerHeights()
    })
    resizeObserver.observe(listRef.value)
  }

  window.addEventListener('resize', measureAnswerHeights, { passive: true })
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', measureAnswerHeights)
})

watch(() => props.items, async () => {
  await nextTick()
  measureAnswerHeights()
}, { deep: true })
</script>

<template>
  <div ref="listRef" class="faq-list space-y-3">
    <div
      ref="measureRef"
      class="faq-measure"
      aria-hidden="true"
    >
      <p
        v-for="item in items"
        :key="`measure-${item.question}`"
        data-faq-measure
        class="faq-answer-body"
      >
        {{ item.answer }}
      </p>
    </div>

    <div
      v-for="(item, index) in items"
      :key="item.question"
      class="faq-item card-static-flush"
    >
      <button
        type="button"
        class="faq-trigger w-full text-left"
        :class="{ 'faq-trigger--active': activeIndex === index }"
        :aria-expanded="activeIndex === index"
        :id="triggerId(index)"
        :aria-controls="panelId(index)"
        @click="toggle(index)"
      >
        {{ item.question }}
        <svg
          class="h-5 w-5 shrink-0 text-accent transition-transform duration-300"
          :class="activeIndex === index ? 'rotate-180' : ''"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        :id="panelId(index)"
        class="faq-answer-slot"
        :class="{ 'faq-answer-slot--open': activeIndex === index }"
        :style="activeIndex === index ? { height: `${slotHeight(index)}px` } : undefined"
        role="region"
        :aria-labelledby="triggerId(index)"
        :aria-hidden="activeIndex !== index"
      >
        <div class="faq-answer-slot-inner">
          <p class="faq-answer-body">
            {{ item.answer }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="faq-reserve"
      :style="{ height: `${reserveHeight}px` }"
      aria-hidden="true"
    />
  </div>
</template>
