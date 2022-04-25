import { ApolloError } from 'apollo-server-core'

import { storeStatus as ss, updateStatus as us } from 'database'
import { StatusDTO, StoreStatusDTO, UpdateStatusDTO } from 'schemas'
import { GE, errorHandling, EFA } from '../utils'

const storeStatus = async (
  statusData: StoreStatusDTO,
  { log }: Context
): Promise<StatusDTO> => {
  try {
    const result = await ss(statusData)

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

const updateStatus = async (
  statusData: UpdateStatusDTO,
  { log }: Context
): Promise<StatusDTO> => {
  try {
    const result = await us(statusData)

    if (!result) throw new ApolloError(EFA.NOT_FOUND, 'NOT_FOUND')

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

export { storeStatus, updateStatus }
