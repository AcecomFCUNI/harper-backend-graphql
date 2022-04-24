import { Static, Type } from '@sinclair/typebox'

import { id } from '.'

const area = Type.Object({
  abstract: Type.String(),
  code: Type.Number(),
  image: Type.String(),
  name: Type.String()
})

type Area = Static<typeof area>

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

export { areaDto, AreaDTO, area, Area }
