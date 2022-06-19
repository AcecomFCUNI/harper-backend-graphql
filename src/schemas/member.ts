import { Static, Type } from '@sinclair/typebox'

import { areaDto } from './area'
import { careerDto } from './career'
import { id, Nullable } from './helpers'
import { statusDto } from './status'

const memberDto = Type.Object({
  id: Type.Optional(id),
  area: Type.Union([id, areaDto]),
  birthday: Type.String(),
  career: Type.Union([id, careerDto]),
  code: Type.String(),
  email: Type.Array(Type.String()),
  git: Type.String(),
  key: Type.Boolean(),
  lastName: Type.String(),
  name: Type.String(),
  phone: Type.Array(Type.String()),
  photo: Type.String(),
  status: Type.Union([id, statusDto]),
  createdAt: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.String()),
  displayName: Type.Optional(Nullable(Type.String())),
  linkedin: Type.Optional(Nullable(Type.String()))
})

type MemberDTO = Static<typeof memberDto>

const storeMemberDto = Type.Object({
  area: Type.Number(),
  birthday: Type.String(),
  career: Type.String(),
  code: Type.String(),
  email: Type.Array(Type.String()),
  git: Type.String(),
  key: Type.Boolean(),
  lastName: Type.String(),
  name: Type.String(),
  phone: Type.Array(Type.String()),
  photo: Type.String(),
  status: Type.String(),
  displayName: Type.Optional(Type.String()),
  linkedin: Type.Optional(Type.String())
})

type StoreMemberDTO = Static<typeof storeMemberDto>

const storeMembersDto = Type.Array(storeMemberDto)

type StoreMembersDTO = Static<typeof storeMembersDto>

const updateMemberDto = Type.Object({
  id,
  area: Type.Optional(Type.Number()),
  birthday: Type.Optional(Type.String()),
  career: Type.Optional(Type.String()),
  code: Type.Optional(Type.String()),
  email: Type.Optional(Type.Array(Type.String())),
  git: Type.Optional(Type.String()),
  key: Type.Optional(Type.Boolean()),
  lastName: Type.Optional(Type.String()),
  name: Type.Optional(Type.String()),
  phone: Type.Optional(Type.Array(Type.String())),
  photo: Type.Optional(Type.String()),
  status: Type.Optional(Type.String()),
  displayName: Type.Optional(Type.String()),
  linkedin: Type.Optional(Type.String())
})

type UpdateMemberDTO = Static<typeof updateMemberDto>

export {
  memberDto,
  MemberDTO,
  storeMemberDto,
  StoreMemberDTO,
  storeMembersDto,
  StoreMembersDTO,
  updateMemberDto,
  UpdateMemberDTO
}
