import { Static, TSchema, Type } from '@sinclair/typebox'
import Ajv from 'ajv/dist/2019.js'
import addFormats from 'ajv-formats'

const id = Type.String({
  pattern: '^[a-zA-Z0-9]{24,}$'
})

type ID = Static<typeof id>

const idSchema = Type.Object({ id })

type IDSchema = Static<typeof idSchema>

const ajv = addFormats(new Ajv(), ['email'])
  .addKeyword('kind')
  .addKeyword('modifier')

const Nullable = <T extends TSchema>(type: T) => Type.Union([type, Type.Null()])

export { id, ID, idSchema, IDSchema, ajv, Nullable }
