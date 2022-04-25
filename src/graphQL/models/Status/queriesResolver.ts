import { StatusDTO } from 'schemas'
import { errorHandling, GE } from '../utils'
import { getOneStatus, getAllStatus } from './queries'

const Query = {
  getOneStatus: async (
    parent: unknown,
    { id }: { id: string },
    context: Context
  ): Promise<StatusDTO> => {
    const { log } = context

    try {
      const result = await getOneStatus(id, context)

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
  getAllStatus: async (
    parent: unknown,
    args: unknown,
    context: Context
  ): Promise<StatusDTO[]> => await getAllStatus(context)
}

export { Query }
