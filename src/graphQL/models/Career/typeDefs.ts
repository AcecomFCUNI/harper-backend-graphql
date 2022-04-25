import { gql } from 'apollo-server-core'

const Career = gql`
  type Career {
    id: ID!
    code: String!
    name: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getCareer(code: String!): Career!
    getCareers: [Career!]!
  }

  input StoreCareerInput {
    code: String!
    name: String!
  }

  input UpdateCareerInput {
    id: String!
    code: String
    name: String
  }

  type Mutation {
    storeCareer(career: StoreCareerInput!): Career!
    updateCareer(career: UpdateCareerInput!): Career!
  }
`

export { Career }
