import { ApolloError } from 'apollo-server-core'

import { storeArea as sa, updateArea as ua } from 'database'
import { AreaDTO, StoreAreaDTO, UpdateAreaDTO } from 'schemas'
import { GE, errorHandling, EFA } from '../utils'

const storeArea = async (
  areaData: StoreAreaDTO,
  { log }: Context
): Promise<AreaDTO> => {
  try {
    const result = await sa(areaData)

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

const updateArea = async (
  areaData: UpdateAreaDTO,
  { log }: Context
): Promise<AreaDTO> => {
  try {
    const result = await ua(areaData)

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

export { storeArea, updateArea }
