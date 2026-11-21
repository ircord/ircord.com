<script setup lang="ts">
import { site } from '../../site'
import {
  changelogs,
  changelogSource,
  readComponentChangelog,
} from '../../utils/component-changelog'

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
useHead({ link: [{ rel: 'canonical', href: url }] })

const releases = import.meta.server ? await readComponentChangelog(component.id) : []
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 pt-16 pb-20 sm:px-6">
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
        :href="releases.length ? changelogSource(component.id) : `${site.repo}/${component.id}`"
        class="prose-link"
        >{{ releases.length ? 'Read the changelog on GitHub' : 'View the project on GitHub' }}</a
      >
    </div>
    <p
      v-if="!releases.length"
      class="mt-5 leading-relaxed text-muted"
    >
      Release notes will appear here after the first release.
    </p>
    <ol
      v-else
      class="mt-5 grid gap-6"
    >
      <li
        v-for="release in releases"
        :key="release.version"
      >
        <article
          :id="release.version"
          :aria-labelledby="`${release.version}-title`"
          class="panel scroll-mt-4 p-6 sm:p-8"
        >
          <h3
            :id="`${release.version}-title`"
            class="flex flex-wrap items-baseline gap-x-3 text-[24px] font-bold tracking-tight"
          >
            {{ release.version }}
            <time
              v-if="release.date"
              :datetime="release.date"
              class="text-[15px] font-medium text-muted"
              >{{ formatDate(release.date) }}</time
            >
          </h3>
          <section
            v-for="group in release.groups"
            :key="group.title"
            class="mt-5"
          >
            <h4
              v-if="group.title"
              class="eyebrow"
            >
              {{ group.title }}
            </h4>
            <template
              v-for="(block, index) in group.blocks"
              :key="index"
            >
              <ul
                v-if="block.type === 'list'"
                class="mt-3 grid list-disc gap-2 pl-5 leading-relaxed marker:text-muted"
              >
                <li
                  v-for="(item, itemIndex) in block.items"
                  :key="itemIndex"
                >
                  <InlineText :content="item" />
                </li>
              </ul>
              <p
                v-else
                class="mt-3 leading-relaxed"
              >
                <InlineText :content="block.content" />
              </p>
            </template>
          </section>
        </article>
      </li>
    </ol>
  </div>
</template>
