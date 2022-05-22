import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { mergeSchemas } from '@graphql-tools/schema'

import { AreaTD, AreaResolvers } from './Area'
import { CareerTD, CareerResolver } from './Career'
import { MemberTD, MemberResolvers } from './Member'
import { ProjectTD, ProjectResolvers } from './Project'
import { StatusTD, StatusResolvers } from './Status'

const mergedTypes = mergeTypeDefs([
  AreaTD,
  CareerTD,
  MemberTD,
  ProjectTD,
  StatusTD
])

const mergedResolvers = mergeResolvers([
  AreaResolvers,
  CareerResolver,
  MemberResolvers,
  ProjectResolvers,
  StatusResolvers
])

const mergedSchema = mergeSchemas({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers
})

export { mergedSchema }
