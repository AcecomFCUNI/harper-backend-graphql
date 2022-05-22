import { ApolloError } from 'apollo-server-core'

import { getProject as gp, getProjectsPerArea as gppa } from 'database'
import { ProjectDTO } from 'schemas'
import { EFP, GE, errorHandling } from '../utils'

const getProject = async (
  id: string,
  { log }: Context
): Promise<ProjectDTO> => {
  try {
    const project = await gp(id)

    if (!project) throw new ApolloError(EFP.NOT_FOUND, 'NOT_FOUND')

    return project
  } catch (e) {
    return errorHandling({
      e,
      message: GE.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      log
    })
  }
}

const getProjectsPerArea = async (
  areaId: string,
  { log }: Context
): Promise<ProjectDTO[]> => {
  try {
    const projects = await gppa(areaId)

    if (!projects) throw new ApolloError(EFP.NOT_FOUND, 'NOT_FOUND')

    return projects
  } catch (e) {
    return errorHandling({
      e,
      message: GE.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      log
    })
  }
}

export { getProject, getProjectsPerArea }
