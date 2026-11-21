<script setup lang="ts">
import { site } from '../../site'
import { changelogs, changelogSource } from '../../utils/component-changelog'

const route = useRoute()
const component = changelogs.find((log) => log.id === (route.params.component || 'frontend'))
if (!component) throw createError({ statusCode: 404, statusMessage: 'Changelog not found' })

const title = `${component.label} release notes | IRCord`
const description = `What changed in each IRCord ${component.label.toLowerCase()} release.`
const url = `${site.url}${component.path}`
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: url,
})
useHead({
  link: [{ rel: 'canonical', href: url }],
  script: [{ type: 'module', src: '/changelog-live.js' }],
})
</script>

<template>
  <div :data-changelog="component.id">
    <div class="hero relative isolate overflow-hidden">
      <div
        class="grid-backdrop absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div class="mx-auto max-w-3xl px-4 pt-12 pb-10 sm:px-6 sm:pt-20 sm:pb-12">
        <p class="eyebrow">Release notes</p>
        <h1
          class="mt-3 text-[clamp(2.5rem,1.8rem+3vw,3.5rem)] leading-[1.05] font-bold tracking-[-0.03em]"
        >
          What’s new
        </h1>
        <p class="lede mt-4">{{ description }}</p>
        <nav
          aria-label="Component changelogs"
          class="mt-8"
        >
          <ul class="inline-flex gap-1 rounded-full border border-line bg-surface p-1">
            <li
              v-for="log in changelogs"
              :key="log.id"
            >
              <NuxtLink
                :to="log.path"
                external
                :aria-current="component.id === log.id ? 'page' : undefined"
                class="inline-flex h-10 items-center rounded-full px-4 text-[15px] font-semibold text-muted no-underline transition-colors hover:text-ink aria-[current=page]:bg-raised aria-[current=page]:text-ink aria-[current=page]:shadow-sm sm:px-5"
                >{{ log.label }}</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="mx-auto max-w-3xl px-4 pt-4 pb-20 sm:px-6 sm:pb-28">
      <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
        <h2 class="text-[22px] font-semibold tracking-tight sm:text-[24px]">
          {{ component.label }} releases
        </h2>
        <a
          :href="changelogSource(component.id)"
          class="prose-link"
          >{{
            component.id === 'desktop' ? 'View releases on GitHub' : 'Read the changelog on GitHub'
          }}</a
        >
      </div>
      <DesktopDownloads
        v-if="component.id === 'desktop'"
        class="mt-3"
      />
      <p
        class="mt-6 rounded-3xl border border-dashed border-line p-6 leading-relaxed text-muted sm:p-8"
        role="status"
        data-changelog-status
      >
        Follow the GitHub link to see release notes at the source.
      </p>
      <ol
        class="timeline mt-8"
        data-changelog-releases
        hidden
      />
    </div>
  </div>
</template>

<style scoped>
.hero {
  background: radial-gradient(70% 80% at 50% 0%, var(--glow), transparent 70%);
}
</style>
