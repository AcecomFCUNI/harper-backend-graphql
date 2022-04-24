import { makeExecutableSchema } from '@graphql-tools/schema'

import { Area as AreaTD } from './typeDefs'
import { Query } from './queriesResolver'
import { Mutation } from './mutationsResolver'

const resolvers = {
  Query,
  Mutation
}

const Area = makeExecutableSchema({
  typeDefs: AreaTD,
  resolvers
})

export { Area }
