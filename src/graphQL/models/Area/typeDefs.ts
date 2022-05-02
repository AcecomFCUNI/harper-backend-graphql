import { gql } from 'apollo-server-core'

const AreaTD = gql`
  type Area {
    id: ID!
    abstract: String!
    code: Int!
    image: String!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getArea(code: Int!): Area!
    getAreas: [Area!]!
  }

  input StoreAreaInput {
    abstract: String!
    image: String!
    name: String!
  }

  input UpdateAreaInput {
    id: String!
    abstract: String
    image: String
    name: String
  }

  type Mutation {
    storeArea(area: StoreAreaInput!): Area!
    updateArea(area: UpdateAreaInput!): Area!
  }
`

export { AreaTD }
