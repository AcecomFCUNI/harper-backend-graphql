type ID = import('mongoose').Schema.Types.ObjectId

interface ProjectDBO {
  id: string
  area: ID
  description: string
  name: string
  participants: ID[]
  repo: string[]
  topic: string
  createdAt: Date
  updatedAt: Date
}

interface ProjectAreaParticipantsDBO extends ProjectDBO {
  area: import('mongoose').PopulatedDoc<
    import('mongoose').Document<unknown, unknown, AreaDBO> &
      AreaDBO & { _id: import('mongoose').Types.ObjectId },
    ID
  >
  participants: import('mongoose').PopulatedDoc<
    (import('mongoose').Document<unknown, unknown, MemberDBO> &
      MemberDBO & { _id: import('mongoose').Types.ObjectId })[],
    ID[]
  >
}
