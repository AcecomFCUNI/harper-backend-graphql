import { ApolloError } from 'apollo-server-core'

import { getOneStatus as gos, getAllStatus as gas } from 'database'
import { StatusDTO } from 'schemas'
import { EFA, GE, errorHandling } from '../utils'

const getOneStatus = async (
  id: string,
  { log }: Context
): Promise<StatusDTO> => {
  try {
    const status = await gos(id)

    if (!status) throw new ApolloError(EFA.NOT_FOUND, 'NOT_FOUND')

    return status
  } catch (e) {
    return errorHandling({
      e,
      message: GE.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      log
    })
  }
}

const getAllStatus = async ({ log }: Context): Promise<StatusDTO[]> => {
  try {
    const status = await gas()

    return status
  } catch (e) {
    return errorHandling({
      e,
      message: GE.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      log
    })
  }
}

export { getOneStatus, getAllStatus }
