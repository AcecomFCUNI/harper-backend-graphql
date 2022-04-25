import { mergeSchemas } from '@graphql-tools/schema'

import { Area } from './Area'
import { Career } from './Career'

const mergedSchema = mergeSchemas({
  schemas: [Area, Career]
})

export { mergedSchema }
