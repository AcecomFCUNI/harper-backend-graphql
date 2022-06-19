import { Static, Type } from '@sinclair/typebox'

import { id } from './helpers'

const areaDto = Type.Object({
  id: Type.Optional(id),
  abstract: Type.String(),
  code: Type.Number(),
  image: Type.String(),
  name: Type.String(),
  createdAt: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.String())
})

type AreaDTO = Static<typeof areaDto>

const storeAreaDto = Type.Object({
  abstract: Type.String(),
  image: Type.String(),
  name: Type.String()
})

type StoreAreaDTO = Static<typeof storeAreaDto>

const updateAreaDto = Type.Object({
  id,
  abstract: Type.Optional(Type.String()),
  image: Type.Optional(Type.String()),
  name: Type.Optional(Type.String())
})

type UpdateAreaDTO = Static<typeof updateAreaDto>

export {
  areaDto,
  AreaDTO,
  storeAreaDto,
  StoreAreaDTO,
  updateAreaDto,
  UpdateAreaDTO
}
