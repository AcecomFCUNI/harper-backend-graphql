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

interface ProjectAreaDBO extends ProjectDBO {
  area: import('mongoose').PopulatedDoc<AreaDBO>
}

interface ProjectParticipantsDBO extends ProjectDBO {
  participants: import('mongoose').PopulatedDoc<AreaDBO[]>
}

interface ProjectAreaParticipantsDBO
  extends ProjectAreaDBO,
    ProjectParticipantsDBO {}
