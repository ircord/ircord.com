<script setup lang="ts">
import { site } from '../site'

const links = [
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Features', to: '/#features' },
  { label: 'Get started', to: '/#get-started' },
  { label: 'Downloads', to: '/#downloads' },
  { label: 'What’s new', to: '/changelog' },
]
</script>

<template>
  <!-- Sticky on every width. On phones the links move to a second row that scrolls sideways,
       because the site sends no scripts for a menu button. -->
  <header
    class="sticky top-0 z-20 border-b border-line bg-canvas/80 backdrop-blur-xl backdrop-saturate-150"
  >
    <div class="wrap flex h-14 items-center gap-6 md:h-16">
      <NuxtLink
        to="/"
        class="flex flex-none items-center gap-2.5 rounded-lg text-[17px] font-bold tracking-tight text-ink no-underline"
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
              class="inline-flex h-9 items-center rounded-full px-3 text-muted no-underline transition-colors hover:bg-raised hover:text-ink"
              >{{ link.label }}</NuxtLink
            >
          </li>
        </ul>
      </nav>
      <a
        :href="site.app"
        class="btn-primary ml-auto min-h-9 px-4 text-[14px] md:ml-0"
        >Open IRCord</a
      >
    </div>
    <nav
      aria-label="Main"
      class="md:hidden"
    >
      <ul
        class="no-scrollbar wrap flex gap-1.5 overflow-x-auto pb-2.5 text-[14px] font-medium whitespace-nowrap"
      >
        <li
          v-for="link in links"
          :key="link.to"
        >
          <NuxtLink
            :to="link.to"
            class="inline-flex h-8 items-center rounded-full border border-line bg-surface px-3 text-muted no-underline active:text-ink"
            >{{ link.label }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </header>
</template>
