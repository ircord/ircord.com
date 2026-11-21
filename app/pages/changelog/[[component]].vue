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
  <div
    class="mx-auto max-w-3xl px-4 pt-16 pb-20 sm:px-6"
    :data-changelog="component.id"
  >
    <h1 class="text-[36px] leading-tight font-bold tracking-tight sm:text-[48px]">What’s new</h1>
    <nav
      aria-label="Component changelogs"
      class="mt-8 border-b border-line"
    >
      <ul class="flex flex-wrap gap-x-5 gap-y-1">
        <li
          v-for="log in changelogs"
          :key="log.id"
        >
          <NuxtLink
            :to="log.path"
            :aria-current="component.id === log.id ? 'page' : undefined"
            class="inline-flex min-h-11 items-center border-b-2 border-transparent px-1 font-semibold text-muted no-underline hover:text-ink aria-[current=page]:border-accent aria-[current=page]:text-ink"
            >{{ log.label }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
    <div class="mt-8 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
      <h2 class="text-[24px] font-semibold tracking-tight">{{ component.label }} releases</h2>
      <a
        :href="component.id === 'desktop' ? site.desktop : changelogSource(component.id)"
        class="prose-link"
        data-changelog-source
        >{{
          component.id === 'desktop' ? 'View the project on GitHub' : 'Read the changelog on GitHub'
        }}</a
      >
    </div>
    <p
      class="mt-5 leading-relaxed text-muted"
      role="status"
      data-changelog-status
    >
      Follow the GitHub link to see release notes at the source.
    </p>
    <ol
      class="mt-5 grid gap-6"
      data-changelog-releases
      hidden
    />
  </div>
</template>
