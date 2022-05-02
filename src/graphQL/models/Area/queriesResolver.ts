import { AreaDTO } from 'schemas'
import { getArea, getAreas } from './queries'
import { errorHandling, GE } from '../utils'

const Query = {
  getArea: async (
    parent: unknown,
    { code }: { code: number },
    context: Context
  ): Promise<AreaDTO> => {
    const { log } = context

    try {
      const result = await getArea(code, context)

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
  getAreas: async (
    parent: unknown,
    args: unknown,
    context: Context
  ): Promise<AreaDTO[]> => await getAreas(context)
}

export { Query }
