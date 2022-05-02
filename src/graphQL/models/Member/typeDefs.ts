import { gql } from 'apollo-server-core'

const MemberTD = gql`
  type Member {
    id: ID!
    area: Area!
    birthday: String!
    career: Career!
    code: String!
    email: [String!]!
    git: String!
    key: Boolean!
    lastName: String!
    name: String
    phone: [String!]!
    photo: String!
    status: Status!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getMember(code: Int!): Member!
    getMembers: [Member!]!
  }

  input StoreMemberInput {
    area: Int!
    birthday: String!
    career: String!
    code: String!
    email: [String!]!
    git: String!
    key: Boolean!
    lastName: String!
    name: String!
    phone: [String!]!
    photo: String!
    status: String!
  }

  input UpdateMemberInput {
    id: String!
    area: Int
    birthday: String
    career: String
    code: String
    email: [String!]
    git: String
    key: Boolean
    lastName: String
    name: String
    phone: [String!]
    photo: String
    status: String
  }

  type Mutation {
    storeMember(member: StoreMemberInput!): Member!
    storeMembers(members: [StoreMemberInput!]!): [Member!]!
    updateMember(member: UpdateMemberInput!): Member!
  }
`

export { MemberTD }
