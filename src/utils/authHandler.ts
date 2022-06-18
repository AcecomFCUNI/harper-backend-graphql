import { FastifyRequest, FastifyReply } from 'fastify'
import { response } from 'network/response'

const authHandler = async (
  request: FastifyRequest<{ Headers: { 'api-key'?: string } }>,
  reply: FastifyReply
) => {
  const headerToken = request.headers['api-key']

  if (!headerToken) throw new Error('No token provided')

  if (headerToken && headerToken.split(' ')[0] !== 'Bearer') {
    return response({
      error: true,
      message: 'Invalid token',
      reply,
      status: 401
    })
  }

  const token = headerToken.split(' ')[1]

  if (token !== process.env.TOKEN)
    return response({
      error: true,
      message: 'Could not authorize',
      reply,
      status: 401
    })
}

export { authHandler }
