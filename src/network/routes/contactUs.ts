import { FastifyInstance } from 'fastify'

import { ContactUsService } from 'services'
import { emailDto, EmailDTO, response as contactUsResponse } from 'schemas'
import { response } from 'network/response'
import { authHandler } from 'utils'

const ContactUs = (app: FastifyInstance, prefix = '/api'): void => {
  app.post<{ Body: EmailDTO; Headers: { 'api-key'?: string } }>(
    `${prefix}/contactUs`,
    {
      schema: {
        body: emailDto,
        response: contactUsResponse
      },
      preHandler: [authHandler]
    },
    (request, reply) => {
      const { body } = request
      const cus = new ContactUsService({
        emailDto: body
      })
      cus.process({ type: 'mail' })

      return response({
        error: false,
        message: 'Message sent!',
        reply,
        status: 200
      })
    }
  )
}

export { ContactUs }
