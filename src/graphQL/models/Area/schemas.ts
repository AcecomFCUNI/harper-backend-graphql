import { Static, Type } from '@sinclair/typebox'

import { id } from 'schemas'

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

export { storeAreaDto, StoreAreaDTO, updateAreaDto, UpdateAreaDTO }
