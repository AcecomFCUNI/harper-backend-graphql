import { Static, Type } from '@sinclair/typebox'

const emailDto = Type.Object({
  lastName: Type.String(),
  mail: Type.String(),
  message: Type.String(),
  name: Type.String(),
  subject: Type.String()
})

type EmailDTO = Static<typeof emailDto>

export { EmailDTO, emailDto }
