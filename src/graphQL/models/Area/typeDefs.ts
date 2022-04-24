import { gql } from 'apollo-server-core'

const Area = gql`
  type Area {
    id: ID!
    abstract: String!
    code: Int
    image: String
    name: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getAreas: [Area!]!
    getArea(code: Int!): Area!
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

export { Area }
