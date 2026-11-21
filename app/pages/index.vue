<script setup lang="ts">
import { collaborators } from '../data'
import { site } from '../site'
import type shots from '../shots.json'

const description =
  'IRCord is a web client and a bouncer in one. It keeps your IRC networks online and saves the messages you miss.'
const title = `${site.tagline} | IRCord`
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: `${site.url}/`,
})
useHead({ link: [{ rel: 'canonical', href: `${site.url}/` }] })
const names = new Intl.ListFormat('en', { type: 'conjunction' }).format(collaborators)

const features: {
  title: string
  text: string
  shot: keyof typeof shots
  alt: string
  /** How the picture fills the card; by default it is cropped from the top left. */
  fit?: string
  /** The picture's frame; by default square on phones, to zoom in, and 16:10 from `sm`. */
  stage?: string
}[] = [
  {
    title: 'Message history and search',
    text: 'Read what was said while you were away. Search your saved messages by word, person, channel or date.',
    shot: 'search',
    alt: 'The search page with two messages that contain the word desk.',
  },
  {
    title: 'Files, pictures and link previews',
    text: 'Upload files and see pictures, video and link previews in the conversation.',
    shot: 'media',
    alt: 'A message with a picture of a road through red mountains, and a reply below it.',
  },
  {
    title: 'Profiles and status',
    text: 'Set a picture, a status and a short profile. Other people see them on your profile card.',
    shot: 'profile',
    alt: 'The profile card of Mika, an operator, with the channels you share.',
    fit: 'object-cover object-[50%_30%]',
  },
  {
    title: 'Notifications on every device',
    text: 'Get mentions and direct messages on your computer and your phone. The inbox keeps what you missed.',
    shot: 'inbox',
    alt: 'The inbox with two direct messages and one mention.',
    stage: 'aspect-[5/4] sm:aspect-[16/10]',
  },
  {
    title: 'Replies, reactions, edits and custom emoji',
    text: 'Use them on networks that support them. Other IRC clients see ordinary messages.',
    shot: 'reactions',
    alt: 'Messages with formatted text and emoji reactions.',
    fit: 'object-cover object-left-top sm:object-contain',
    stage: 'aspect-video sm:aspect-[16/10]',
  },
  {
    title: 'Your look',
    text: 'Choose from 13 color schemes, most of them in light and dark, and set the font and spacing.',
    shot: 'appearance',
    alt: 'Appearance settings with a preview and a grid of color schemes.',
  },
]

/** Stroke icon paths on a 24-unit grid. */
const icons = {
  devices:
    'M4 6.5A1.5 1.5 0 0 1 5.5 5h11A1.5 1.5 0 0 1 18 6.5V9M2 17h10M4 14V9m11 0h4.5a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-4.5a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 15 9Zm2 8h1',
  server:
    'M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm0 9h14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Zm3-5.5h.01M8 16.5h.01',
  network:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3Z',
  terminal:
    'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm3 5 3 2-3 2m5 0h5',
  desktop: 'M4 4h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm4 16h8m-4-4v4',
  phone:
    'M8 2.5h8A1.5 1.5 0 0 1 17.5 4v16a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 20V4A1.5 1.5 0 0 1 8 2.5Zm3 16h2',
}

const steps: { title: string; text: string; icon: keyof typeof icons }[] = [
  {
    title: 'Your devices',
    text: 'A browser or the installed app on your computer and phone.',
    icon: 'devices',
  },
  {
    title: 'IRCord server',
    text: 'Stays connected for you and stores messages, files and settings.',
    icon: 'server',
  },
  {
    title: 'IRC networks',
    text: 'Libera.Chat, OFTC, irc.ircord.com or your own server.',
    icon: 'network',
  },
]

const install = [
  { device: 'iPhone and iPad.', how: 'In Safari, use Share → Add to Home Screen.' },
  { device: 'Android.', how: 'In Chrome, choose Install from the browser menu.' },
  { device: 'Desktop.', how: 'Use the install option in your browser, where available.' },
]
</script>

<template>
  <div>
    <!-- 1 Hero -->
    <section
      aria-labelledby="hero-title"
      class="hero relative isolate overflow-hidden"
    >
      <div
        class="grid-backdrop absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div class="wrap pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-28">
        <div class="mx-auto max-w-3xl text-center">
          <h1
            id="hero-title"
            class="text-[clamp(2.5rem,1.6rem+4.6vw,4.75rem)] leading-[1.02] font-bold tracking-[-0.035em] text-balance"
          >
            {{ site.tagline }}.
          </h1>
          <p class="lede mx-auto mt-5 max-w-2xl text-pretty sm:mt-6 sm:text-[20px]">
            {{ description }} Open it in a browser or install it on your phone.
          </p>
          <div
            class="mx-auto mt-8 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
          >
            <a
              :href="site.app"
              class="btn-primary shadow-lg shadow-accent/25"
              >Open IRCord
              <svg
                class="size-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14m-6-6 6 6-6 6" /></svg
            ></a>
            <a
              href="#get-started"
              class="btn-secondary"
              >Get started</a
            >
          </div>
        </div>

        <!-- The desktop screenshot in a browser frame, with the phone in front of its corner. On
             phones the phone screenshot leads, large enough to read, with the desktop behind it. -->
        <div class="relative mx-auto mt-12 max-w-5xl sm:mt-16 sm:pr-[8%]">
          <div
            class="overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/15 max-sm:absolute max-sm:top-0 max-sm:left-0 max-sm:w-[88%] sm:rounded-2xl"
          >
            <div
              class="flex h-6 items-center gap-1.5 border-b border-line px-2.5 sm:h-9 sm:gap-2 sm:px-4"
              aria-hidden="true"
            >
              <span class="size-1.5 rounded-full bg-line sm:size-2.5" />
              <span class="size-1.5 rounded-full bg-line sm:size-2.5" />
              <span class="size-1.5 rounded-full bg-line sm:size-2.5" />
              <span
                class="mx-auto hidden rounded-md bg-canvas px-10 py-0.5 text-[12px] text-muted sm:block"
                >{{ site.app.replace('https://', '') }}</span
              >
            </div>
            <AppShot
              name="channel-desktop"
              alt="IRCord in a browser: the #general channel with networks, channels, a conversation and the member list."
              eager
            />
          </div>
          <div
            class="relative mt-[22%] mr-[2%] ml-auto aspect-[9/16] w-[58%] max-w-[300px] overflow-hidden rounded-[clamp(22px,2.6vw,30px)] border-[clamp(4px,0.5vw,6px)] border-[#1c181d] shadow-2xl shadow-black/40 sm:absolute sm:right-0 sm:-bottom-[8%] sm:mt-0 sm:mr-0 sm:aspect-auto sm:w-[24%] sm:max-w-[230px] sm:rounded-[clamp(10px,2.6vw,30px)] sm:border-[clamp(3px,0.5vw,6px)]"
          >
            <AppShot
              name="channel-phone"
              alt="The same channel on a phone."
              eager
              img-class="block h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- 2 How it works -->
    <section
      id="how-it-works"
      aria-labelledby="how-title"
      class="section"
    >
      <div class="wrap">
        <div class="max-w-2xl">
          <p class="eyebrow">How it works</p>
          <h2
            id="how-title"
            class="section-title"
          >
            A client in your browser, a bouncer on the server.
          </h2>
        </div>
        <ol
          class="mt-10 grid items-stretch gap-2 md:mt-12 md:grid-cols-[1fr_auto_1fr_auto_1fr]"
          aria-label="How your messages travel"
        >
          <template
            v-for="(step, index) in steps"
            :key="step.title"
          >
            <li
              v-if="index > 0"
              class="grid place-items-center py-1 text-link md:px-1"
              aria-hidden="true"
            >
              <svg
                class="size-6 rotate-90 md:rotate-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 8h15m-4-4 4 4-4 4M20 16H5m4-4-4 4 4 4" />
              </svg>
            </li>
            <li
              class="panel flex gap-4 p-5 sm:p-6 md:flex-col"
              :class="
                index === 1 &&
                'step-active border-[color-mix(in_srgb,var(--accent)_45%,var(--line))]'
              "
            >
              <span class="icon-tile">
                <svg
                  class="size-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path :d="icons[step.icon]" />
                </svg>
              </span>
              <div>
                <h3 class="text-[18px] font-semibold">{{ step.title }}</h3>
                <p class="mt-1.5 leading-relaxed text-muted">{{ step.text }}</p>
              </div>
            </li>
          </template>
        </ol>
        <ul
          class="mt-10 grid gap-6 text-[16px] leading-relaxed sm:text-[17px] md:mt-12 md:grid-cols-3 md:gap-8"
        >
          <li class="border-l-2 border-accent pl-4">
            A bouncer is a server that stays on IRC for you. IRCord includes one.
          </li>
          <li class="border-l-2 border-line pl-4">
            The server keeps your connections open and stores your messages, files and settings.
          </li>
          <li class="border-l-2 border-line pl-4">
            Sign in on another device with the same username and password. Your conversations are
            already there.
          </li>
        </ul>
      </div>
    </section>

    <!-- 3 Features -->
    <section
      id="features"
      aria-labelledby="features-title"
      class="section border-y border-line bg-surface"
    >
      <div class="wrap">
        <p class="eyebrow">Features</p>
        <h2
          id="features-title"
          class="section-title"
        >
          What you can do with it
        </h2>
        <ul class="mt-10 grid gap-4 sm:gap-5 md:mt-12 md:grid-cols-2 lg:gap-6">
          <li
            v-for="feature in features"
            :key="feature.title"
            class="group flex flex-col overflow-hidden rounded-3xl border border-line bg-canvas transition-colors hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--line))]"
          >
            <div class="p-5 sm:p-7 sm:pb-6">
              <h3 class="text-[18px] font-semibold sm:text-[20px]">{{ feature.title }}</h3>
              <p class="mt-2 leading-relaxed text-muted">{{ feature.text }}</p>
            </div>
            <!-- The screenshot sits in the corner of a tinted stage, like a window. -->
            <!-- Phones get a square stage, which zooms the cropped screenshot to a readable size. -->
            <div
              class="feature-stage relative mt-auto"
              :class="feature.stage ?? 'aspect-square sm:aspect-[16/10]'"
            >
              <div
                class="absolute inset-0 top-5 left-5 overflow-hidden rounded-tl-2xl border-t border-l border-line bg-surface shadow-xl shadow-black/10 transition-transform duration-300 group-hover:-translate-y-1 sm:top-7 sm:left-7"
              >
                <AppShot
                  :name="feature.shot"
                  :alt="feature.alt"
                  :img-class="`block h-full w-full ${feature.fit ?? 'object-cover object-left-top'}`"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- 4 IRC stays IRC -->
    <section
      aria-labelledby="irc-title"
      class="section"
    >
      <div class="wrap grid gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
        <div>
          <p class="eyebrow">IRC stays IRC</p>
          <h2
            id="irc-title"
            class="section-title"
          >
            Ordinary IRC on the network
          </h2>
        </div>
        <ul class="check-list text-[16px] leading-relaxed sm:text-[17px]">
          <li>
            IRCord connects to ordinary IRC networks, such as Libera.Chat and OFTC, and to your own
            server.
          </li>
          <li>People on irssi, WeeChat or any other client see ordinary messages.</li>
          <li>IRCord uses a network’s IRCv3 features only when the network offers them.</li>
          <li>
            Your IRCord account on chat.ircord.com is also your account on irc.ircord.com. The same
            sign-in works from any IRC client.
          </li>
        </ul>
      </div>
    </section>

    <!-- Get started -->
    <section
      id="get-started"
      aria-labelledby="get-started-title"
      class="section border-y border-line bg-surface"
    >
      <div class="wrap">
        <h2
          id="get-started-title"
          class="section-title mt-0"
        >
          How to get started
        </h2>
        <div class="mt-10 grid gap-4 sm:gap-5 md:mt-12 md:grid-cols-2 lg:gap-6">
          <div class="flex min-w-0 flex-col rounded-3xl border border-line bg-canvas p-5 sm:p-8">
            <span class="icon-tile">
              <svg
                class="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path :d="icons.network" />
              </svg>
            </span>
            <h3 class="mt-5 text-[22px] font-semibold tracking-tight">Use chat.ircord.com</h3>
            <p class="mt-2 leading-relaxed text-muted">
              One account works on chat.ircord.com and the {{ site.ircNetwork }} network.
            </p>
            <ol class="steps mt-6 grid gap-4 leading-relaxed">
              <li>Ask an IRCord maintainer for a registration key.</li>
              <li>Create an account with the key and choose your username and password.</li>
              <li>Choose a channel from the welcome guide to start chatting.</li>
            </ol>
            <p class="mt-5 leading-relaxed text-muted">
              To connect to a network like Libera.Chat, go to Settings → Networks → Add a network.
            </p>
            <div class="mt-auto flex flex-wrap gap-3 pt-7">
              <a
                :href="site.signup"
                class="btn-primary"
                >Create an account</a
              >
              <a
                :href="site.app"
                class="btn-secondary"
                >Sign in</a
              >
            </div>
          </div>
          <div
            id="host"
            class="flex min-w-0 flex-col rounded-3xl border border-line bg-canvas p-5 sm:p-8"
          >
            <span class="icon-tile">
              <svg
                class="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path :d="icons.server" />
              </svg>
            </span>
            <h3 class="mt-5 text-[22px] font-semibold tracking-tight">Host your own IRCord</h3>
            <p class="mt-2 leading-relaxed text-muted">
              With Docker Compose installed, run these commands to start the web app and server.
            </p>
            <!-- A terminal stays dark in both color modes. public/site.js shows the copy button. -->
            <div
              class="mt-6 overflow-hidden rounded-2xl bg-[#17141a] text-[#ece6ea] shadow-lg"
              data-terminal
            >
              <div class="flex h-10 items-center border-b border-white/10 pr-2 pl-4">
                <span
                  class="flex gap-1.5"
                  aria-hidden="true"
                >
                  <span class="size-2.5 rounded-full bg-[#ff5f57]" />
                  <span class="size-2.5 rounded-full bg-[#febc2e]" />
                  <span class="size-2.5 rounded-full bg-[#28c840]" />
                </span>
                <button
                  type="button"
                  class="ml-auto inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-[13px] font-medium text-[#b9aeb5] transition-colors hover:bg-white/10 hover:text-white"
                  aria-live="polite"
                  data-copy
                  hidden
                >
                  <svg
                    class="size-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 9h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1Zm-4 6H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"
                    />
                  </svg>
                  <span data-copy-label>Copy commands</span>
                </button>
              </div>
              <pre
                class="p-4 font-mono text-[13px] leading-relaxed wrap-anywhere whitespace-pre-wrap lg:text-[14px]"
              ><code><span class="select-none text-[#fb7185]">$ </span>git clone https://github.com/ircord/hosting.git
<span class="select-none text-[#fb7185]">$ </span>cd hosting
<span class="select-none text-[#fb7185]">$ </span>docker compose up -d --wait</code></pre>
            </div>
            <p class="mt-5 leading-relaxed text-muted">
              Open <code class="font-mono text-[0.92em] text-ink">http://localhost:3000</code> to
              create an account.
            </p>
            <div class="mt-auto flex flex-wrap gap-3 pt-7">
              <a
                :href="site.docker"
                class="btn-secondary"
                >Docker Compose guide</a
              >
              <a
                :href="site.kubernetes"
                class="btn-secondary"
                >Helm guide</a
              >
            </div>
          </div>
        </div>
        <div
          id="instance"
          class="mt-4 rounded-3xl border border-dashed border-line p-5 sm:mt-5 sm:p-8 lg:mt-6"
          aria-labelledby="instance-title"
          role="region"
        >
          <h3
            id="instance-title"
            class="text-[18px] font-semibold"
          >
            About chat.ircord.com
          </h3>
          <ul
            class="mt-4 grid list-disc gap-2 pl-5 leading-relaxed text-muted marker:text-link md:grid-cols-2 md:gap-x-10"
          >
            <li>The IRCord project runs chat.ircord.com and irc.ircord.com.</li>
            <li>
              The server stores your messages, files and settings so they are there on every device.
            </li>
            <li>Delete your account at any time in Settings → Account.</li>
            <li>Accounts are deleted after 90 days without a visit.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Downloads -->
    <section
      id="downloads"
      aria-labelledby="downloads-title"
      class="section"
    >
      <div class="wrap">
        <h2
          id="downloads-title"
          class="section-title mt-0"
        >
          Downloads
        </h2>
        <div class="mt-10 grid gap-4 sm:gap-5 md:mt-12 md:grid-cols-[3fr_2fr] lg:gap-6">
          <div class="hero-panel panel flex flex-col p-5 sm:p-8">
            <span class="icon-tile">
              <svg
                class="size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path :d="icons.devices" />
              </svg>
            </span>
            <h3 class="mt-5 text-[22px] font-semibold tracking-tight">Install the web app</h3>
            <p class="mt-2 leading-relaxed text-muted">
              Open IRCord in your browser, then install it on your device.
            </p>
            <dl
              class="mt-6 divide-y divide-line rounded-2xl border border-line bg-canvas text-[15px] leading-relaxed"
            >
              <div
                v-for="item in install"
                :key="item.device"
                class="px-4 py-3.5 sm:flex sm:gap-4 sm:px-5"
              >
                <dt class="font-semibold sm:w-36 sm:flex-none">{{ item.device }}</dt>
                <dd class="mt-0.5 text-muted sm:mt-0">{{ item.how }}</dd>
              </div>
            </dl>
            <div class="mt-auto pt-7">
              <a
                :href="site.app"
                class="btn-primary"
                >Open web app</a
              >
            </div>
          </div>
          <ul class="grid gap-4 sm:gap-5 lg:gap-6">
            <li class="panel flex gap-4 p-5 sm:p-6">
              <span class="icon-tile">
                <svg
                  class="size-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path :d="icons.terminal" />
                </svg>
              </span>
              <div class="min-w-0">
                <h3 class="text-[18px] font-semibold">Command-line client</h3>
                <p class="mt-1 leading-relaxed text-muted">
                  Manage your server with
                  <code class="font-mono text-[0.92em] text-ink">ircordctl</code>. Builds are
                  available for macOS, Linux, and Windows.
                </p>
                <a
                  :href="site.cliReleases"
                  class="prose-link mt-2 inline-block"
                  >Download ircordctl</a
                >
              </div>
            </li>
            <li class="panel flex gap-4 p-5 sm:p-6">
              <span class="icon-tile">
                <svg
                  class="size-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path :d="icons.desktop" />
                </svg>
              </span>
              <div class="min-w-0">
                <h3 class="text-[18px] font-semibold">Native desktop app</h3>
                <p class="mt-1 text-muted">Planned.</p>
                <a
                  :href="site.desktop"
                  class="prose-link mt-2 inline-block"
                  >Desktop project</a
                >
              </div>
            </li>
            <li class="panel flex gap-4 p-5 sm:p-6">
              <span class="icon-tile">
                <svg
                  class="size-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path :d="icons.phone" />
                </svg>
              </span>
              <div class="min-w-0">
                <h3 class="text-[18px] font-semibold">Native mobile app</h3>
                <p class="mt-1 text-muted">Planned for iOS and Android.</p>
                <a
                  :href="site.mobile"
                  class="prose-link mt-2 inline-block"
                  >Mobile project</a
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 6 For server owners -->
    <section
      aria-labelledby="owners-title"
      class="section border-y border-line bg-surface"
    >
      <div class="wrap grid gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
        <div>
          <p class="eyebrow">For server owners</p>
          <h2
            id="owners-title"
            class="section-title"
          >
            Run it for your community
          </h2>
        </div>
        <div>
          <ul class="check-list text-[16px] leading-relaxed sm:text-[17px]">
            <li>
              Connect IRCord to your own Ergo IRC server. One sign-up then creates both accounts.
            </li>
            <li>Choose the channels new members are offered when they join.</li>
            <li>See the server’s health and add other owners in the Administration panel.</li>
            <li>Mark bots and remove other people’s messages from the conversation.</li>
          </ul>
          <p class="mt-8">
            <a
              :href="site.ergo"
              class="btn-secondary"
              >Connect an IRC server</a
            >
          </p>
        </div>
      </div>
    </section>

    <!-- 7 Open source -->
    <section
      aria-labelledby="source-title"
      class="section"
    >
      <div class="wrap">
        <div
          class="hero-panel panel relative overflow-hidden px-5 py-12 text-center sm:px-10 sm:py-16"
        >
          <BrandMark class="mx-auto size-14 drop-shadow-lg" />
          <p class="eyebrow mt-6">Open source</p>
          <h2
            id="source-title"
            class="section-title"
          >
            Built in the open
          </h2>
          <p class="lede mx-auto mt-4 max-w-2xl">
            IRCord is open source under the
            <a
              :href="site.license"
              class="prose-link"
              >MIT license</a
            >.
          </p>
          <p
            v-if="collaborators.length"
            class="lede mx-auto mt-2 max-w-2xl"
          >
            Built by {{ names }}.
          </p>
          <div
            class="mx-auto mt-8 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
          >
            <NuxtLink
              to="/changelog"
              external
              class="btn-primary"
              >What’s new</NuxtLink
            >
            <a
              :href="site.repo"
              class="btn-secondary"
              >Source code on GitHub</a
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hibiki's ambient glow at the top of the page. */
.hero {
  background: radial-gradient(70% 55% at 50% 0%, var(--glow), transparent 70%);
}
.hero-panel {
  background: radial-gradient(60% 80% at 0% 0%, var(--glow), transparent 70%), var(--surface);
}
.step-active {
  background: radial-gradient(90% 120% at 50% 0%, var(--glow), transparent 70%), var(--surface);
}
.feature-stage {
  background:
    radial-gradient(80% 90% at 100% 100%, var(--glow), transparent 70%),
    color-mix(in srgb, var(--ink) 3%, var(--surface));
}

/* Numbered steps in a filled circle. */
.steps {
  counter-reset: step;
}
.steps > li {
  position: relative;
  padding-left: 2.5rem;
  counter-increment: step;
}
.steps > li::before {
  content: counter(step);
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  background: var(--accent);
  color: var(--on-accent);
  font-size: 0.85rem;
  font-weight: 700;
}
</style>
