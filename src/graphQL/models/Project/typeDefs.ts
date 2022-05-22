import { gql } from 'apollo-server-core'

const ProjectTD = gql`
  type Project {
    id: ID!
    area: [Area!]!
    description: String!
    name: String!
    participants: [Member!]!
    repo: [String]
    topic: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    getProject(id: String!): Project!
    getProjectPerArea(areaId: String!): [Projects]!
  }

  input StoreProjectInput {
    area: String!
    description: String!
    name: String!
    participants: [String!]!
    repo: [String!]!
    topic: String!
  }

  input UpdateProjectInput {
    id: ID!
    area: String
    description: String
    name: String
    participants: [String]
    repo: [String]
    topic: String
  }

  type Mutation {
    storeProject(project: StoreProjectInput!): Project!
    updateProject(project: UpdateProjectInput!): Project
  }
`

export { ProjectTD }
