<script setup lang="ts">
import { siteConfig } from '~/data/site'

interface Props {
  sourcePage?: string
}

const props = withDefaults(defineProps<Props>(), {
  sourcePage: 'Головна',
})

const form = reactive({
  name: '',
  phone: '',
  car: '',
  problem: '',
  preferredDay: '',
  website: '', // honeypot
})

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')
const consent = ref(false)

async function submitForm() {
  if (form.website) return

  status.value = 'loading'
  errorMessage.value = ''

  try {
    await $fetch('/api/lead', {
      method: 'POST',
      body: {
        name: form.name,
        phone: form.phone,
        car: form.car || undefined,
        problem: form.problem,
        preferredDay: form.preferredDay || undefined,
        sourcePage: props.sourcePage,
      },
    })
    status.value = 'success'
    form.name = ''
    form.phone = ''
    form.car = ''
    form.problem = ''
    form.preferredDay = ''
  }
  catch (error: unknown) {
    status.value = 'error'
    errorMessage.value = error instanceof Error ? error.message : 'Не вдалося надіслати заявку. Спробуйте ще раз або зателефонуйте нам.'
  }
}
</script>

<template>
  <section id="lead-form" class="section-padding bg-bg-soft">
    <div class="container-narrow">
      <div class="mx-auto max-w-2xl">
        <UiReveal>
          <h2 class="section-title text-center">Записатись на ремонт</h2>
          <p class="section-subtitle mx-auto text-center">
            Залиште заявку — ми звʼяжемось з вами найближчим часом. Або зателефонуйте:
            <a :href="`tel:${siteConfig.phone}`" class="text-accent hover:underline">{{ siteConfig.phoneDisplay }}</a>
          </p>
        </UiReveal>

        <Transition name="menu">
          <div v-if="status === 'success'" class="mt-8 rounded-xl border border-accent/30 bg-accent-soft p-6 text-center">
            <p class="font-medium text-text">
              Дякуємо! Ми отримали заявку і звʼяжемось з вами найближчим часом.
            </p>
          </div>
        </Transition>

        <form v-if="status !== 'success'" class="mt-8 space-y-4" @submit.prevent="submitForm">
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <label for="name" class="mb-1 block text-sm text-text-muted">Імʼя *</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                autocomplete="name"
                class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text transition-[border-color,box-shadow] duration-200 placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Ваше імʼя"
              >
            </div>
            <div>
              <label for="phone" class="mb-1 block text-sm text-text-muted">Телефон *</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                autocomplete="tel"
                class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text transition-[border-color,box-shadow] duration-200 placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="+380..."
              >
            </div>
          </div>

          <div>
            <label for="car" class="mb-1 block text-sm text-text-muted">Марка / модель авто</label>
            <input
              id="car"
              v-model="form.car"
              type="text"
              class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text transition-[border-color,box-shadow] duration-200 placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="Наприклад, BMW F30"
            >
          </div>

          <div>
            <label for="problem" class="mb-1 block text-sm text-text-muted">Що потрібно зробити? *</label>
            <textarea
              id="problem"
              v-model="form.problem"
              required
              rows="4"
              class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text transition-[border-color,box-shadow] duration-200 placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="Опишіть проблему або потрібну послугу"
            />
          </div>

          <div>
            <label for="preferredDay" class="mb-1 block text-sm text-text-muted">Бажаний день</label>
            <input
              id="preferredDay"
              v-model="form.preferredDay"
              type="text"
              class="w-full rounded-xl border border-border bg-surface px-4 py-3 text-text transition-[border-color,box-shadow] duration-200 placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="Наприклад, пʼятниця"
            >
          </div>

          <!-- Honeypot -->
          <input
            v-model="form.website"
            type="text"
            name="website"
            tabindex="-1"
            autocomplete="off"
            class="hidden"
            aria-hidden="true"
          >

          <p v-if="status === 'error'" class="text-sm text-accent">
            {{ errorMessage }}
          </p>

          <label class="flex cursor-pointer items-start gap-3 text-sm text-text-muted">
            <input
              v-model="consent"
              type="checkbox"
              required
              class="mt-1 h-4 w-4 shrink-0 rounded border-border bg-surface text-accent focus:ring-accent"
            >
            <span>
              Надсилаючи заявку, я погоджуюсь з
              <NuxtLink to="/polityka-konfidentsiynosti" class="text-accent hover:underline">
                Політикою конфіденційності
              </NuxtLink>
              та даю згоду на обробку персональних даних.
            </span>
          </label>

          <button
            type="submit"
            class="btn-primary w-full"
            :disabled="status === 'loading' || !consent"
          >
            <UiSpinner v-if="status === 'loading'" />
            {{ status === 'loading' ? 'Надсилання...' : 'Надіслати заявку' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
