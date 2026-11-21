import { formatDate, type Block, type Inline, type Release } from './changelog'
import {
  changelogs,
  changelogSource,
  readComponentChangelog,
  type ChangelogComponent,
} from './component-changelog'

function element<Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag,
  classes = '',
  text = '',
): HTMLElementTagNameMap[Tag] {
  const node = document.createElement(tag)
  node.className = classes
  node.textContent = text
  return node
}

function appendInline(node: HTMLElement, parts: Inline[]) {
  for (const part of parts) {
    switch (part.type) {
      case 'text':
        node.append(part.text)
        break
      case 'strong':
        node.append(element('strong', 'font-semibold text-ink', part.text))
        break
      case 'code':
        node.append(
          element('code', 'rounded-md bg-raised px-1.5 py-0.5 font-mono text-[0.9em]', part.text),
        )
        break
      case 'link': {
        const link = element('a', 'prose-link', part.text)
        link.href = part.href
        node.append(link)
        break
      }
    }
  }
}

function renderBlock(block: Block) {
  if (block.type === 'paragraph') {
    const paragraph = element('p', 'mt-3 leading-relaxed')
    appendInline(paragraph, block.content)
    return paragraph
  }

  const list = element('ul', 'mt-3 grid list-disc gap-2 pl-5 leading-relaxed marker:text-muted')
  for (const parts of block.items) {
    const item = element('li')
    appendInline(item, parts)
    list.append(item)
  }
  return list
}

function renderRelease(release: Release, index: number) {
  const item = element('li')
  const article = element('article', 'panel p-5 sm:p-7 wrap-anywhere')
  const heading = element(
    'h3',
    'flex flex-wrap items-center gap-x-3 gap-y-1 text-[22px] font-bold tracking-tight sm:text-[24px]',
    release.version,
  )
  article.id = release.version
  heading.id = `${release.version}-title`
  article.setAttribute('aria-labelledby', heading.id)
  if (index === 0) {
    heading.append(
      element(
        'span',
        'rounded-full bg-accent px-2.5 py-0.5 text-[12px] font-semibold tracking-normal text-on-accent',
        'Latest',
      ),
    )
  }
  if (release.date) {
    const date = element('time', 'text-[15px] font-medium text-muted', formatDate(release.date))
    date.dateTime = release.date
    heading.append(date)
  }
  article.append(heading)
  for (const group of release.groups) {
    const section = element('section', 'mt-6')
    if (group.title) {
      const label = element('h4', 'release-group', group.title)
      label.dataset.kind = group.title.toLowerCase()
      section.append(label)
    }
    section.append(...group.blocks.map(renderBlock))
    article.append(section)
  }
  item.append(article)
  return item
}

async function loadChangelog(
  component: ChangelogComponent,
  status: HTMLElement,
  list: HTMLOListElement,
  source: HTMLAnchorElement,
) {
  status.textContent = 'Loading release notes…'
  try {
    const releases = await readComponentChangelog(component)
    if (!releases.length) {
      status.textContent = 'Release notes will appear here after the first release.'
      return
    }

    list.replaceChildren(...releases.map(renderRelease))
    list.hidden = false
    status.hidden = true
    source.href = changelogSource(component)
    source.textContent = 'Read the changelog on GitHub'
    // The browser's first attempt to scroll to a release runs before its notes load.
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView()
  } catch {
    status.textContent = 'Couldn’t load the release notes. Refresh this page to try again.'
  }
}

const page = document.querySelector<HTMLElement>('[data-changelog]')
const component = changelogs.find((log) => log.id === page?.dataset.changelog)
const status = page?.querySelector<HTMLElement>('[data-changelog-status]')
const list = page?.querySelector<HTMLOListElement>('[data-changelog-releases]')
const source = page?.querySelector<HTMLAnchorElement>('[data-changelog-source]')
if (component && status && list && source) void loadChangelog(component.id, status, list, source)
