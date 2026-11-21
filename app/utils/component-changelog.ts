import { site } from '../site'
import { parseChangelog } from './changelog'

export const changelogs = [
  { id: 'frontend', label: 'Frontend', path: '/changelog' },
  { id: 'backend', label: 'Backend', path: '/changelog/backend' },
  { id: 'desktop', label: 'Desktop', path: '/changelog/desktop' },
] as const

type Component = (typeof changelogs)[number]['id']

export function changelogSource(component: Component) {
  return `${site.repo}/${component}/blob/main/CHANGELOG.md`
}

export async function readComponentChangelog(component: Component, request = fetch) {
  const url = `https://raw.githubusercontent.com/ircord/${component}/main/CHANGELOG.md`
  const response = await request(url, { signal: AbortSignal.timeout(10_000) })
  if (component === 'desktop' && response.status === 404) return []
  if (!response.ok) {
    throw new Error(`Cannot read the ${component} changelog from GitHub (HTTP ${response.status}).`)
  }
  return parseChangelog(await response.text())
}
