import { Static, Type } from '@sinclair/typebox'

const responseDto = Type.Object({
  error: Type.Boolean(),
  message: Type.Any()
})

type ResponseDTO = Static<typeof responseDto>

const response = {
  200: responseDto
}

export { ResponseDTO, responseDto, response }
