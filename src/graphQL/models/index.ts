import { mergeSchemas } from '@graphql-tools/schema'

import { Area } from './Area'
import { Career } from './Career'
import { Status } from './Status'

const mergedSchema = mergeSchemas({
  schemas: [Area, Career, Status]
})

export { mergedSchema }
