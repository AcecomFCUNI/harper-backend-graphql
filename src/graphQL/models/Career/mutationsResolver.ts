import { DefinedError } from 'ajv'
import { ApolloError } from 'apollo-server-core'

import {
  ajv,
  CareerDTO,
  storeCareerDto,
  StoreCareerDTO,
  updateCareerDto,
  UpdateCareerDTO
} from 'schemas'
import { errorHandling, GE } from '../utils'
import { storeCareer, updateCareer } from './mutations'

const Mutation = {
  storeCareer: async (
    parent: unknown,
    { career }: { career: StoreCareerDTO },
    context: Context
  ): Promise<CareerDTO> => {
    const { log } = context
    const validate = ajv.compile(storeCareerDto)

    try {
      const ok = validate(career)

      if (!ok)
        throw new ApolloError(
          `${(validate.errors as DefinedError[])[0].instancePath.replace(
            '/',
            ''
          )} ${(validate.errors as DefinedError[])[0].message as string}`,
          'UNPROCESSABLE_ENTITY'
        )

      return await storeCareer(career, { log })
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
  updateCareer: async (
    parent: unknown,
    { career }: { career: UpdateCareerDTO },
    context: Context
  ): Promise<CareerDTO> => {
    const { log } = context
    const validate = ajv.compile(updateCareerDto)

    try {
      const ok = validate(career)

      if (!ok)
        throw new ApolloError(
          `${(validate.errors as DefinedError[])[0].instancePath.replace(
            '/',
            ''
          )} ${(validate.errors as DefinedError[])[0].message as string}`,
          'UNPROCESSABLE_ENTITY'
        )

      return await updateCareer(career, context)
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
