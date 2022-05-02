import { gql } from 'apollo-server-core'

const StatusTD = gql`
  type Status {
    id: ID!
    name: String!
  }

  type Query {
    getOneStatus(id: String!): Status!
    getAllStatus: [Status!]!
  }

  input StoreStatusInput {
    name: String!
  }

  input UpdateStatusInput {
    id: String!
    name: String
  }

  type Mutation {
    storeStatus(status: StoreStatusInput!): Status!
    updateStatus(status: UpdateStatusInput!): Status!
  }
`

export { StatusTD }
