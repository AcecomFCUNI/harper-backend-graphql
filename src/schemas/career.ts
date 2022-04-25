import { Static, Type } from '@sinclair/typebox'

import { id } from '.'

const career = Type.Object({
  code: Type.String(),
  name: Type.String()
})

type Career = Static<typeof career>

const careerDto = Type.Object({
  id: Type.Optional(id),
  code: Type.String(),
  name: Type.String(),
  createdAt: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.String())
})

type CareerDTO = Static<typeof careerDto>

const storeCareerDto = Type.Object({
  code: Type.String(),
  name: Type.String()
})

type StoreCareerDTO = Static<typeof storeCareerDto>

const updateCareerDto = Type.Object({
  id,
  code: Type.Optional(Type.String()),
  name: Type.Optional(Type.String())
})

type UpdateCareerDTO = Static<typeof updateCareerDto>

export {
  Career,
  career,
  CareerDTO,
  careerDto,
  StoreCareerDTO,
  storeCareerDto,
  UpdateCareerDTO,
  updateCareerDto
}
