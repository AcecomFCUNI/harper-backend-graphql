import { FastifyInstance } from 'fastify'
import { response } from 'network/response'

const Home = (app: FastifyInstance, prefix = '/'): void => {
  app.get(`${prefix}`, (request, reply) => {
    response({
      error: false,
      message: "Welcome to Harpers's backend, but now with GraphQL!",
      reply,
      status: 200
    })
  })
}

export { Home }
