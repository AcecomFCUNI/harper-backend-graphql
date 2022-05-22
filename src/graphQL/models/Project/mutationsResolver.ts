import { DefinedError } from 'ajv'
import { ApolloError } from 'apollo-server-core'

import {
  ajv,
  ProjectDTO,
  StoreProjectDTO,
  storeProjectDto,
  updateProjectDto,
  UpdateProjectDTO
} from 'schemas'
import { errorHandling, GE } from '../utils'
import { storeProject, updateProject } from './mutations'

const Mutation = {
  storeProject: async (
    parent: unknown,
    { project }: { project: StoreProjectDTO },
    context: Context
  ): Promise<ProjectDTO> => {
    const { log } = context
    const validate = ajv.compile(storeProjectDto)

    try {
      const ok = validate(project)

      if (!ok)
        throw new ApolloError(
          `${(validate.errors as DefinedError[])[0].instancePath.replace(
            '/',
            ''
          )} ${(validate.errors as DefinedError[])[0].message as string}`,
          'UNPROCESSABLE_ENTITY'
        )

      return await storeProject(project, context)
    } catch (e) {
      log.error(validate.errors)

      return errorHandling({
        e,
        message: GE.INTERNAL_SERVER_ERROR,
        code: 'INTERNAL_SERVER_ERROR',
        log
      })
    }
  },
  updateProject: async (
    parent: unknown,
    { project }: { project: UpdateProjectDTO },
    context: Context
  ): Promise<ProjectDTO> => {
    const { log } = context
    const validate = ajv.compile(updateProjectDto)

    try {
      const ok = validate(project)

      if (!ok)
        throw new ApolloError(
          `${(validate.errors as DefinedError[])[0].instancePath.replace(
            '/',
            ''
          )} ${(validate.errors as DefinedError[])[0].message as string}`,
          'UNPROCESSABLE_ENTITY'
        )

      return await updateProject(project, context)
    } catch (e) {
      log.error(validate.errors)

      return errorHandling({
        e,
        message: GE.INTERNAL_SERVER_ERROR,
        code: 'INTERNAL_SERVER_ERROR',
        log
      })
    }
  }
}

export { Mutation }
