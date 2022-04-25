import { makeExecutableSchema } from '@graphql-tools/schema'

import { Status as StatusTD } from './typeDefs'
import { Query } from './queriesResolver'
import { Mutation } from './mutationsResolver'

const resolvers = {
  Query,
  Mutation
}

const Status = makeExecutableSchema({
  typeDefs: StatusTD,
  resolvers
})

export { Status }
