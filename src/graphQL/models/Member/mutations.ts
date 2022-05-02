import { ApolloError } from 'apollo-server-core'

import {
  storeMember as sm,
  storeMembers as sms,
  updateMember as um
} from 'database'
import {
  MemberDTO,
  StoreMemberDTO,
  StoreMembersDTO,
  UpdateMemberDTO
} from 'schemas'
import { GE, errorHandling, EFA } from '../utils'

const storeMember = async (
  memberData: StoreMemberDTO,
  { log }: Context
): Promise<MemberDTO> => {
  try {
    const result = await sm(memberData)

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

const storeMembers = async (
  membersData: StoreMembersDTO,
  { log }: Context
): Promise<MemberDTO[]> => {
  try {
    const result = await sms(membersData)

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

const updateMember = async (
  memberData: UpdateMemberDTO,
  { log }: Context
): Promise<MemberDTO> => {
  try {
    const result = await um(memberData)

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

export { storeMember, storeMembers, updateMember }
