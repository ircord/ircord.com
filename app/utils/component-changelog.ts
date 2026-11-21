import { site } from '../site'
import { parseChangelog } from './changelog'

export const changelogs = [
  { id: 'frontend', label: 'Frontend', path: '/changelog' },
  { id: 'backend', label: 'Backend', path: '/changelog/backend' },
  { id: 'desktop', label: 'Desktop', path: '/changelog/desktop' },
] as const

export type ChangelogComponent = (typeof changelogs)[number]['id']

export function changelogSource(component: ChangelogComponent) {
  if (component === 'desktop') return `${site.desktop}/releases`
  return `${site.repo}/${component}/blob/main/CHANGELOG.md`
}

interface DesktopRelease {
  tag_name: string
  published_at: string
  draft: boolean
  prerelease: boolean
  body: string | null
}

export async function readComponentChangelog(component: ChangelogComponent, request = fetch) {
  const url =
    component === 'desktop'
      ? 'https://api.github.com/repos/ircord/desktop/releases?per_page=30'
      : `https://raw.githubusercontent.com/ircord/${component}/main/CHANGELOG.md`
  const response = await request(url, {
    cache: 'no-cache',
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    signal: AbortSignal.timeout(10_000),
  })
  if (!response.ok) {
    throw new Error(`Cannot read the ${component} changelog from GitHub (HTTP ${response.status}).`)
  }
  if (component !== 'desktop') return parseChangelog(await response.text())

  const releases: DesktopRelease[] = await response.json()
  const markdown = releases
    .filter(
      ({ tag_name, published_at, draft, prerelease }) =>
        !draft && !prerelease && /^v\d+\.\d+\.\d+$/.test(tag_name) && published_at,
    )
    .sort((a, b) => b.published_at.localeCompare(a.published_at))
    .map(
      ({ tag_name, published_at, body }) =>
        `## ${tag_name} — ${published_at.slice(0, 10)}\n\n${body?.replace(/^#{1,2} +/gm, '### ') ?? ''}`,
    )
    .join('\n\n')
  return parseChangelog(markdown)
}
