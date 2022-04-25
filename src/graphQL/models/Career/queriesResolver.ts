import { CareerDTO } from 'schemas'
import { errorHandling, GE } from '../utils'
import { getCareer, getCareers } from './queries'

const Query = {
  getCareer: async (
    parent: unknown,
    { code }: { code: string },
    context: Context
  ): Promise<CareerDTO> => {
    const { log } = context

    try {
      const result = await getCareer(code, context)

      return result
    } catch (e) {
      return errorHandling({
        e,
        message: GE.INTERNAL_SERVER_ERROR,
        code: 'INTERNAL_SERVER_ERROR',
        log
      })
    }
  },
  getCareers: async (
    parent: unknown,
    args: unknown,
    context: Context
  ): Promise<CareerDTO[]> => await getCareers(context)
}

export { Query }
