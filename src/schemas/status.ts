import { Static, Type } from '@sinclair/typebox'

import { id } from 'schemas'

const statusDto = Type.Object({
  id: Type.Optional(id),
  name: Type.String(),
  createdAt: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.String())
})

type StatusDTO = Static<typeof statusDto>

const storeStatusDto = Type.Object({
  name: Type.String()
})

type StoreStatusDTO = Static<typeof storeStatusDto>

const updateStatusDto = Type.Object({
  id,
  name: Type.Optional(Type.String())
})

type UpdateStatusDTO = Static<typeof updateStatusDto>

export {
  statusDto,
  StatusDTO,
  storeStatusDto,
  StoreStatusDTO,
  updateStatusDto,
  UpdateStatusDTO
}
