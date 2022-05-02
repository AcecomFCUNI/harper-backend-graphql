import { DefinedError } from 'ajv'
import { ApolloError } from 'apollo-server-core'

import {
  ajv,
  MemberDTO,
  storeMemberDto,
  StoreMemberDTO,
  storeMembersDto,
  StoreMembersDTO,
  updateMemberDto,
  UpdateMemberDTO
} from 'schemas'
import { errorHandling, GE } from '../utils'
import { storeMember, storeMembers, updateMember } from './mutations'

const Mutation = {
  storeMember: async (
    parent: unknown,
    { member }: { member: StoreMemberDTO },
    context: Context
  ): Promise<MemberDTO> => {
    const { log } = context
    const validate = ajv.compile(storeMemberDto)

    try {
      const ok = validate(member)

      if (!ok)
        throw new ApolloError(
          `${(validate.errors as DefinedError[])[0].instancePath.replace(
            '/',
            ''
          )} ${(validate.errors as DefinedError[])[0].message as string}`,
          'UNPROCESSABLE_ENTITY'
        )

      return await storeMember(member, context)
    } catch (e) {
      log.error(validate.errors)

      return errorHandling({
        e,
        message: GE.INTERNAL_SERVER_ERROR,
        code: 'INTERNAL_SERVER_ERROR',
        log
      })
    }
  },
  storeMembers: async (
    parent: unknown,
    { members }: { members: StoreMembersDTO },
    context: Context
  ): Promise<MemberDTO[]> => {
    const { log } = context
    const validate = ajv.compile(storeMembersDto)

    try {
      const ok = validate(members)

      if (!ok)
        throw new ApolloError(
          `${(validate.errors as DefinedError[])[0].instancePath.replace(
            '/',
            ''
          )} ${(validate.errors as DefinedError[])[0].message as string}`,
          'UNPROCESSABLE_ENTITY'
        )

      return await storeMembers(members, context)
    } catch (e) {
      log.error(validate.errors)

      return errorHandling({
        e,
        message: GE.INTERNAL_SERVER_ERROR,
        code: 'INTERNAL_SERVER_ERROR',
        log
      })
    }
  },
  updateMember: async (
    parent: unknown,
    { member }: { member: UpdateMemberDTO },
    context: Context
  ): Promise<MemberDTO> => {
    const { log } = context
    const validate = ajv.compile(updateMemberDto)

    try {
      const ok = validate(member)

      if (!ok)
        throw new ApolloError(
          `${(validate.errors as DefinedError[])[0].instancePath.replace(
            '/',
            ''
          )} ${(validate.errors as DefinedError[])[0].message as string}`,
          'UNPROCESSABLE_ENTITY'
        )

      return await updateMember(member, context)
    } catch (e) {
      log.error(validate.errors)

      return errorHandling({
        e,
        message: GE.INTERNAL_SERVER_ERROR,
        code: 'INTERNAL_SERVER_ERROR',
        log
      })
    }
  }
}

export { Mutation }
