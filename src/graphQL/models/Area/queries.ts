import { ApolloError } from 'apollo-server-core'

import { getAreas as gas, getArea as ga } from 'database'
import { AreaDTO } from 'schemas'
import { EFA, GE, errorHandling } from '../utils'

const getArea = async (code: number, { log }: Context): Promise<AreaDTO> => {
  try {
    const area = await ga(code)

    if (!area) throw new ApolloError(EFA.NOT_FOUND, 'NOT_FOUND')

    return area
  } catch (e) {
    return errorHandling({
      e,
      message: GE.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      log
    })
  }
}

const getAreas = async ({ log }: Context): Promise<AreaDTO[]> => {
  try {
    const areas = await gas()

    return areas
  } catch (e) {
    return errorHandling({
      e,
      message: GE.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      log
    })
  }
}

export { getArea, getAreas }
