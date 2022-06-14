import { Static, Type } from '@sinclair/typebox'

const emailDto = Type.Object({
  name: Type.String(),
  mail: Type.String(),
  phone: Type.String(),
  message: Type.String(),
  subject: Type.String()
})

type EmailDTO = Static<typeof emailDto>

export { EmailDTO, emailDto }
