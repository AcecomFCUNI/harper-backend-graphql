import { mergeSchemas } from '@graphql-tools/schema'

import { Area } from './Area'

const mergedSchema = mergeSchemas({
  schemas: [Area]
})

export { mergedSchema }
