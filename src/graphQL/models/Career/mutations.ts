import { ApolloError } from 'apollo-server-core'

import { storeCareer as sc, updateCareer as uc } from 'database'
import { CareerDTO, StoreCareerDTO, UpdateCareerDTO } from 'schemas'
import { GE, errorHandling, EFA } from '../utils'

const storeCareer = async (
  careerData: StoreCareerDTO,
  { log }: Context
): Promise<CareerDTO> => {
  try {
    const result = await sc(careerData)

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

const updateCareer = async (
  areaData: UpdateCareerDTO,
  { log }: Context
): Promise<CareerDTO> => {
  try {
    const result = await uc(areaData)

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

export { storeCareer, updateCareer }
