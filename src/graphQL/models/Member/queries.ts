import { ApolloError } from 'apollo-server-core'

import { getMembers as gms, getMember as gm } from 'database'
import { MemberDTO } from 'schemas'
import { EFM, GE, errorHandling } from '../utils'

const getMember = async (id: string, { log }: Context): Promise<MemberDTO> => {
  try {
    const member = await gm(id)

    if (!member) throw new ApolloError(EFM.NOT_FOUND, 'NOT_FOUND')

    return member
  } catch (e) {
    return errorHandling({
      e,
      message: GE.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      log
    })
  }
}

const getMembers = async ({ log }: Context): Promise<MemberDTO[]> => {
  try {
    const members = await gms()

    return members
  } catch (e) {
    return errorHandling({
      e,
      message: GE.INTERNAL_SERVER_ERROR,
      code: 'INTERNAL_SERVER_ERROR',
      log
    })
  }
}

export { getMember, getMembers }
