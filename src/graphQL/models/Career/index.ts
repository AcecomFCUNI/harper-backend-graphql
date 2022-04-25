import { makeExecutableSchema } from '@graphql-tools/schema'

import { Career as CareerTD } from './typeDefs'
import { Query } from './queriesResolver'
import { Mutation } from './mutationsResolver'

const resolvers = {
  Query,
  Mutation
}

const Career = makeExecutableSchema({
  typeDefs: CareerTD,
  resolvers
})

export { Career }
