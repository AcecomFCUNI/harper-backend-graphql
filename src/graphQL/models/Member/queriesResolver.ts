import { MemberDTO } from 'schemas'
import { getMember, getMembers } from './queries'
import { errorHandling, GE } from '../utils'

const Query = {
  getMember: async (
    parent: unknown,
    { id }: { id: string },
    context: Context
  ): Promise<MemberDTO> => {
    const { log } = context

    try {
      const result = await getMember(id, context)

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
  getMembers: async (
    parent: unknown,
    args: unknown,
    context: Context
  ): Promise<MemberDTO[]> => await getMembers(context)
}

export { Query }
