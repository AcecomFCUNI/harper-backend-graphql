import { Static, Type } from '@sinclair/typebox'

import { areaDto } from './area'
import { id } from './helpers'
import { memberDto } from './member'

const projectDto = Type.Object({
  id: Type.Optional(id),
  area: Type.Union([id, areaDto]),
  description: Type.String(),
  name: Type.String(),
  participants: Type.Union([Type.Array(id), Type.Array(memberDto)]),
  repo: Type.Array(Type.String()),
  topic: Type.String(),
  createdAt: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.String())
})

type ProjectDTO = Static<typeof projectDto>

const storeProjectDto = Type.Object({
  area: id,
  description: Type.String(),
  name: Type.String(),
  participants: Type.Array(id),
  repo: Type.Array(Type.String()),
  topic: Type.String()
})

type StoreProjectDTO = Static<typeof storeProjectDto>

const updateProjectDto = Type.Object({
  id,
  area: Type.Optional(id),
  description: Type.Optional(Type.String()),
  name: Type.Optional(Type.String()),
  participants: Type.Optional(Type.Array(id)),
  repo: Type.Optional(Type.Array(Type.String())),
  topic: Type.Optional(Type.String())
})

type UpdateProjectDTO = Static<typeof updateProjectDto>

export {
  projectDto,
  ProjectDTO,
  storeProjectDto,
  StoreProjectDTO,
  updateProjectDto,
  UpdateProjectDTO
}
