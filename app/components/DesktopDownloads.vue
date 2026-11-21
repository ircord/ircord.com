<script setup lang="ts">
import { desktopDownloads } from '../site'
</script>

<template>
  <ul
    aria-label="Desktop installers"
    class="flex flex-wrap gap-x-4 gap-y-2 text-[15px]"
  >
    <li
      v-for="download in desktopDownloads"
      :key="download.href"
    >
      <a
        class="prose-link inline-block py-1"
        :href="download.href"
        >{{ download.label }}</a
      >
    </li>
  </ul>
</template>
