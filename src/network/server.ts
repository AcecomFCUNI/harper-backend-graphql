import fastify, { FastifyInstance } from 'fastify'
import { ApolloServer } from 'apollo-server-fastify'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'
import { ApolloServerPlugin } from 'apollo-server-plugin-base'
import mongoose from 'mongoose'

import { mergedSchema as schema } from 'graphQL'
import { birthdayChecker } from 'utils'
import { applyRoutes } from './router'

const PORT = process.env.PORT ?? 4000

class Server {
  #app: FastifyInstance
  #connection: mongoose.Connection | undefined

  constructor() {
    this.#app = fastify({ logger: { prettyPrint: true } })
    this.#config()
  }

  #config() {
    this.#app.addHook('preHandler', (req, reply, done) => {
      reply.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
      reply.header('Access-Control-Allow-Origin', '*')
      reply.header(
        'Access-Control-Allow-Headers',
        'Authorization, Content-Type'
      )
      reply.header('x-powered-by', 'Simba.js')
      done()
    })
    // TODO: upgrade to fastify 4
    // this.#app.setValidatorCompiler(validatorCompiler)
    applyRoutes(this.#app)
  }

  async #mongo(): Promise<void> {
    this.#connection = mongoose.connection

    const connectionConfig = {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 3000,
      socketTimeoutMS: 3000
    }

    this.#connection.on('connected', () => {
      this.#app.log.info('Mongo connection established.')
    })
    this.#connection.on('reconnected', () => {
      this.#app.log.info('Mongo connection reestablished.')
    })
    this.#connection.on('disconnected', () => {
      this.#app.log.info('Mongo connection disconnected')
      this.#app.log.info('Trying to reconnected to Mongo...')
      setTimeout(async () => {
        await mongoose.connect(
          process.env.MONGO_URI as string,
          connectionConfig
        )
      }, 3000)
    })
    this.#connection.on('close', () => {
      this.#app.log.info('Mongo connection closed.')
    })
    this.#connection.on('error', (e: Error) => {
      this.#app.log.info('Mongo connection error:')
      this.#app.log.error(e)
    })
    await mongoose.connect(process.env.MONGO_URI as string, connectionConfig)
  }

  #fastifyAppClosePlugin(): ApolloServerPlugin {
    const app = this.#app

    return {
      async serverWillStart() {
        return {
          async drainServer() {
            await app.close()
          }
        }
      }
    }
  }

  public async start(): Promise<void> {
    const server = new ApolloServer({
      schema,
      plugins: [
        this.#fastifyAppClosePlugin(),
        ApolloServerPluginDrainHttpServer({ httpServer: this.#app.server }),
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageGraphQLPlayground()
      ],
      context: (): Context => ({
        log: this.#app.log
      })
    })

    try {
      await server.start()
      this.#app.register(
        server.createHandler({
          path: '/api'
        })
      )
      await this.#mongo()
      birthdayChecker.start()
      await this.#app.listen(PORT)
      this.#app.log.info(
        `GraphQL server listening at: http://localhost:${PORT}${server.graphqlPath}`
      )
    } catch (e) {
      console.error(e)
    }
  }
}

const server = new Server()

export { server as Server }
