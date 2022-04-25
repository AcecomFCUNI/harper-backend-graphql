import { DefinedError } from 'ajv'
import { ApolloError } from 'apollo-server-core'

import {
  ajv,
  StatusDTO,
  storeStatusDto,
  StoreStatusDTO,
  updateStatusDto,
  UpdateStatusDTO
} from 'schemas'
import { errorHandling, GE } from '../utils'
import { storeStatus, updateStatus } from './mutations'

const Mutation = {
  storeStatus: async (
    parent: unknown,
    { status }: { status: StoreStatusDTO },
    context: Context
  ): Promise<StatusDTO> => {
    const { log } = context
    const validate = ajv.compile(storeStatusDto)

    try {
      const ok = validate(status)

      if (!ok)
        throw new ApolloError(
          `${(validate.errors as DefinedError[])[0].instancePath.replace(
            '/',
            ''
          )} ${(validate.errors as DefinedError[])[0].message as string}`,
          'UNPROCESSABLE_ENTITY'
        )

      return await storeStatus(status, context)
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
  updateStatus: async (
    parent: unknown,
    { status }: { status: UpdateStatusDTO },
    context: Context
  ): Promise<StatusDTO> => {
    const { log } = context
    const validate = ajv.compile(updateStatusDto)

    try {
      const ok = validate(status)

      if (!ok)
        throw new ApolloError(
          `${(validate.errors as DefinedError[])[0].instancePath.replace(
            '/',
            ''
          )} ${(validate.errors as DefinedError[])[0].message as string}`,
          'UNPROCESSABLE_ENTITY'
        )

      return await updateStatus(status, context)
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
