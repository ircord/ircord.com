import collaboratorsFile from '#release-content/COLLABORATORS.md?raw'
import { parseCollaborators } from './utils/changelog'

export const collaborators = parseCollaborators(collaboratorsFile)
