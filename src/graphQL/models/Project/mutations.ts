import { ApolloError } from 'apollo-server-core'

import { storeProject as sp, updateProject as up } from 'database'
import { ProjectDTO, StoreProjectDTO, UpdateProjectDTO } from 'schemas'
import { EFP, GE, errorHandling } from '../utils'

const storeProject = async (
  projectData: StoreProjectDTO,
  { log }: Context
): Promise<ProjectDTO> => {
  try {
    const project = await sp(projectData)

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

const updateProject = async (
  projectData: UpdateProjectDTO,
  { log }: Context
): Promise<ProjectDTO> => {
  try {
    const project = await up(projectData)

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

export { storeProject, updateProject }
