import { DefinedError } from 'ajv'
import { ApolloError } from 'apollo-server-core'

import {
  ajv,
  AreaDTO,
  storeAreaDto,
  StoreAreaDTO,
  UpdateAreaDTO
} from 'schemas'
import { errorHandling, GE } from '../utils'
import { storeArea, updateArea } from './mutation'

const Mutation = {
  storeArea: async (
    parent: unknown,
    { area }: { area: StoreAreaDTO },
    context: Context
  ): Promise<AreaDTO> => {
    const { log } = context
    const validate = ajv.compile(storeAreaDto)

    try {
      const ok = validate(area)

      if (!ok)
        throw new ApolloError(
          `${(validate.errors as DefinedError[])[0].instancePath.replace(
            '/',
            ''
          )} ${(validate.errors as DefinedError[])[0].message as string}`,
          'UNPROCESSABLE_ENTITY'
        )

      return await storeArea(area, { log })
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
  updateArea: async (
    parent: unknown,
    { area }: { area: UpdateAreaDTO },
    context: Context
  ): Promise<AreaDTO> => {
    const { log } = context
    const validate = ajv.compile(storeAreaDto)

    try {
      const ok = validate(area)

      if (!ok)
        throw new ApolloError(
          `${(validate.errors as DefinedError[])[0].instancePath.replace(
            '/',
            ''
          )} ${(validate.errors as DefinedError[])[0].message as string}`,
          'UNPROCESSABLE_ENTITY'
        )

      return await updateArea(area, context)
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
