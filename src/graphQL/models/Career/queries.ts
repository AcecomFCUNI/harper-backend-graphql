import { ApolloError } from 'apollo-server-core'

import { getCareer as gc, getCareers as gcs } from 'database'
import { CareerDTO } from 'schemas'
import { EFA, GE, errorHandling } from '../utils'

const getCareer = async (
  code: string,
  { log }: Context
): Promise<CareerDTO> => {
  try {
    const career = await gc(code)

    if (!career) throw new ApolloError(EFA.NOT_FOUND, 'NOT_FOUND')

    return career
  } catch (e) {
    return errorHandling({
      e,
      message: GE.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      log
    })
  }
}

const getCareers = async ({ log }: Context): Promise<CareerDTO[]> => {
  try {
    const careers = await gcs()

    return careers
  } catch (e) {
    return errorHandling({
      e,
      message: GE.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      log
    })
  }
}

export { getCareer, getCareers }
