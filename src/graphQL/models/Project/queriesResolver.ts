import { ProjectDTO } from 'schemas'
import { getProject, getProjectsPerArea } from './queries'
import { errorHandling, GE } from '../utils'

const Query = {
  getProject: async (
    parent: unknown,
    { id }: { id: string },
    context: Context
  ): Promise<ProjectDTO> => {
    const { log } = context

    try {
      const result = await getProject(id, context)

      return result
    } catch (e) {
      return errorHandling({
        e,
        message: GE.INTERNAL_SERVER_ERROR,
        code: 'INTERNAL_SERVER_ERROR',
        log
      })
    }
  },
  getProjectPerArea: async (
    parent: unknown,
    { areaId }: { areaId: string },
    context: Context
  ): Promise<ProjectDTO[]> => {
    const { log } = context

    try {
      const result = await getProjectsPerArea(areaId, context)

      return result
    } catch (e) {
      return errorHandling({
        e,
        message: GE.INTERNAL_SERVER_ERROR,
        code: 'INTERNAL_SERVER_ERROR',
        log
      })
    }
  }
}

export { Query }
