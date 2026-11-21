import changelog from '#release-content/CHANGELOG.md?raw'
import collaboratorsFile from '#release-content/COLLABORATORS.md?raw'
import { parseChangelog, parseCollaborators } from './utils/changelog'

export const releases = parseChangelog(changelog)
export const latest = releases[0]
export const collaborators = parseCollaborators(collaboratorsFile)
