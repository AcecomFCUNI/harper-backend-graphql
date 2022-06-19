type ID = import('mongoose').Types.ObjectId

interface MemberDBO {
  id: string
  area: ID
  birthday: Date
  career: ID
  code: string
  email: string[]
  git: string
  key: boolean
  lastName: string
  name: string
  phone: string[]
  photo: string
  status: ID
  createdAt: Date
  updatedAt: Date
  displayName?: string
  linkedin?: string
}

interface MemberAreaCareerStatusDBO extends MemberDBO {
  area: import('mongoose').PopulatedDoc<
    import('mongoose').Document<unknown, unknown, AreaDBO> &
      AreaDBO & { _id: import('mongoose').Types.ObjectId },
    ID
  >
  career: import('mongoose').PopulatedDoc<
    import('mongoose').Document<unknown, unknown, CareerDBO> &
      CareerDBO & { _id: import('mongoose').Types.ObjectId },
    ID
  >
  status: import('mongoose').PopulatedDoc<
    import('mongoose').Document<unknown, unknown, StatusDBO> &
      StatusDBO & { _id: import('mongoose').Types.ObjectId },
    ID
  >
}
