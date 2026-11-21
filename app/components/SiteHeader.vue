<script setup lang="ts">
import { site } from '../site'

const links = [
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Features', to: '/#features' },
  { label: 'Get started', to: '/#get-started' },
  { label: 'Downloads', to: '/#downloads' },
  { label: 'What’s new', to: '/changelog' },
]

// Small page behavior for every page, such as closing the phone menu after a link is chosen.
// Every page works without it.
useHead({ script: [{ type: 'module', src: '/site.js' }] })
</script>

<template>
  <header
    class="sticky top-0 z-20 border-b border-line bg-canvas/80 backdrop-blur-xl backdrop-saturate-150"
  >
    <div class="wrap flex h-14 items-center gap-3 md:h-16 md:gap-6">
      <NuxtLink
        to="/"
        class="mr-auto flex flex-none items-center gap-2.5 rounded-lg text-[17px] font-bold tracking-tight text-ink no-underline md:mr-0"
      >
        <BrandMark class="size-8 flex-none" />
        IRCord
      </NuxtLink>
      <nav
        aria-label="Main"
        class="hidden flex-1 justify-center md:flex"
      >
        <ul class="flex gap-1 text-[14px] font-medium">
          <li
            v-for="link in links"
            :key="link.to"
          >
            <NuxtLink
              :to="link.to"
              :external="link.to === '/changelog'"
              class="inline-flex h-9 items-center rounded-full px-3 text-muted no-underline transition-colors hover:bg-raised hover:text-ink"
              >{{ link.label }}</NuxtLink
            >
          </li>
        </ul>
      </nav>
      <a
        :href="site.app"
        class="btn-primary min-h-9 px-4 text-[14px]"
        >Open IRCord</a
      >
      <!-- Phones get a menu button. It works without scripts; public/site.js closes it after a
           link is chosen or on a tap outside. -->
      <details
        id="site-menu"
        class="group md:hidden"
      >
        <summary
          class="grid size-9 cursor-pointer list-none place-items-center rounded-full border border-line bg-raised text-ink [&::-webkit-details-marker]:hidden"
          aria-label="Menu"
        >
          <svg
            class="size-[18px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path
              class="group-open:hidden"
              d="M4 7h16M4 12h16M4 17h16"
            />
            <path
              class="hidden group-open:block"
              d="m6 6 12 12M18 6 6 18"
            />
          </svg>
        </summary>
        <nav
          aria-label="Main"
          class="absolute inset-x-0 top-full border-b border-line bg-canvas shadow-2xl shadow-black/20"
        >
          <ul class="wrap grid py-2 text-[17px] font-medium">
            <li
              v-for="link in links"
              :key="link.to"
              class="border-b border-line/60 last:border-b-0"
            >
              <NuxtLink
                :to="link.to"
                :external="link.to === '/changelog'"
                class="flex h-13 items-center justify-between text-ink no-underline active:text-link"
                >{{ link.label }}
                <svg
                  class="size-4 text-muted"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="m9 6 6 6-6 6" /></svg
              ></NuxtLink>
            </li>
          </ul>
        </nav>
      </details>
    </div>
  </header>
</template>
