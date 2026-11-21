<script setup lang="ts">
import type { NuxtError } from '#app'
import { site } from './site'

// Built as 404.html, which the web server sends for any address without a page (nginx.conf).
const props = defineProps<{ error: NuxtError }>()
const missing = computed(() => props.error.status === 404)
useSeoMeta({
  title: () => (missing.value ? 'Page not found · IRCord' : 'Something went wrong · IRCord'),
  robots: 'noindex',
})
</script>

<template>
  <SiteHeader />
  <main
    id="main"
    class="hero relative isolate overflow-hidden"
  >
    <div
      class="grid-backdrop absolute inset-0 -z-10"
      aria-hidden="true"
    />
    <div class="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-32">
      <span class="icon-tile mx-auto size-14 rounded-3xl">
        <svg
          class="size-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            v-if="missing"
            d="M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm5.3-2.2L21 21M8 8.5l5 5m0-5-5 5"
          />
          <path
            v-else
            d="M12 9v4m0 3.5h.01M10.3 3.9 2.4 17.5A2 2 0 0 0 4.1 20.5h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
          />
        </svg>
      </span>
      <p class="eyebrow mt-6">Error {{ error.status }}</p>
      <h1
        class="mt-3 text-[clamp(2.25rem,1.6rem+3vw,3.5rem)] leading-[1.05] font-bold tracking-[-0.03em] text-balance"
      >
        {{ missing ? 'Page not found' : 'Something went wrong' }}
      </h1>
      <p class="lede mx-auto mt-4 max-w-lg">
        {{
          missing
            ? 'This address has no page. It may have moved, or the link may be wrong.'
            : 'This page could not be shown.'
        }}
      </p>
      <div
        class="mx-auto mt-8 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
      >
        <NuxtLink
          to="/"
          class="btn-primary"
          >Go to the home page</NuxtLink
        >
        <a
          :href="site.app"
          class="btn-secondary"
          >Open IRCord</a
        >
      </div>
    </div>
  </main>
  <SiteFooter />
</template>

<style scoped>
.hero {
  background: radial-gradient(70% 80% at 50% 0%, var(--glow), transparent 70%);
}
</style>
