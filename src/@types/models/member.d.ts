type ID = import('mongoose').Schema.Types.ObjectId

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
}

interface MemberAreaDBO extends MemberDBO {
  area: import('mongoose').PopulatedDoc<AreaDBO>
}

interface MemberCareerDBO extends MemberDBO {
  career: import('mongoose').PopulatedDoc<CareerDBO>
}

interface MemberStatusDBO extends MemberDBO {
  status: import('mongoose').PopulatedDoc<StatusDBO>
}

interface MemberAreaCareerDBO extends MemberAreaDBO, MemberCareerDBO {}

interface MemberAreaStatusDBO extends MemberAreaDBO, MemberStatusDBO {}

interface MemberCareerStatusDBO extends MemberCareerDBO, MemberStatusDBO {}

interface MemberAreaCareerStatusDBO
  extends MemberAreaDBO,
    MemberCareerDBO,
    MemberStatusDBO {}
