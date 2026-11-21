<script setup lang="ts">
import { site } from '../site'
</script>

<template>
  <footer class="border-t border-line bg-surface">
    <div
      class="wrap flex flex-col gap-6 py-10 text-[14px] text-muted md:flex-row md:items-center md:justify-between"
    >
      <div class="flex items-center gap-3">
        <BrandMark class="size-8 flex-none" />
        <p>
          <span class="block font-semibold text-ink">IRCord</span>
          Open source under the MIT license.
        </p>
      </div>
      <nav aria-label="Footer">
        <ul class="grid grid-cols-2 gap-x-8 gap-y-2 sm:flex sm:flex-wrap sm:gap-x-6">
          <li><a :href="site.repo">GitHub</a></li>
          <li>
            <NuxtLink
              to="/changelog"
              external
              >What’s new</NuxtLink
            >
          </li>
          <li><a :href="site.issues">Report a problem</a></li>
          <li><a :href="site.app">chat.ircord.com</a></li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
a {
  color: var(--muted);
  text-decoration: none;
}
a:hover {
  color: var(--ink);
  text-decoration: underline;
}
</style>
