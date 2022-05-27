import { Document, Types, startSession } from 'mongoose'

import {
  AreaDTO,
  CareerDTO,
  MemberDTO,
  StatusDTO,
  StoreMemberDTO,
  UpdateMemberDTO
} from 'schemas'
import { MemberModel, areaDBOtoDTO, careerDBOtoDTO, statusDBOtoDTO } from '..'
import { getArea } from './area'
import { getCareer } from './career'
import { getOneStatusByName } from './status'

const memberDBOtoDTO = (
  memberDBO: Document<unknown, unknown, MemberAreaCareerStatusDBO> &
    MemberAreaCareerStatusDBO & { _id: Types.ObjectId }
): MemberDTO => {
  if (!memberDBO.area) throw new Error('Missing area')

  if (!memberDBO.career) throw new Error('Missing career')

  if (!memberDBO.status) throw new Error('Missing status')

  return {
    ...memberDBO.toObject(),
    birthday: memberDBO.birthday.toISOString(),
    area:
      memberDBO.area instanceof Types.ObjectId
        ? memberDBO.area.toString()
        : areaDBOtoDTO(memberDBO.area),
    career:
      memberDBO.career instanceof Types.ObjectId
        ? memberDBO.career.toString()
        : careerDBOtoDTO(memberDBO.career),
    status:
      memberDBO.status instanceof Types.ObjectId
        ? memberDBO.status.toString()
        : statusDBOtoDTO(memberDBO.status),
    createdAt: memberDBO.createdAt.toISOString(),
    updatedAt: memberDBO.updatedAt.toISOString()
  }
}

const getMember = async (id: string): Promise<MemberDTO | null> => {
  const member = await MemberModel.findById(id)
    .populate('area')
    .populate('career')
    .populate('status')
    .exec()

  return member ? memberDBOtoDTO(member) : null
}

const getMembers = async (sort: 1 | -1 = -1): Promise<MemberDTO[]> => {
  const members = await MemberModel.find({})
    .sort({ lastName: sort })
    .populate('area')
    .populate('career')
    .populate('status')
    .exec()

  return members.map(m => memberDBOtoDTO(m))
}

const getOnlyMembers = async (sort: 1 | -1 = -1): Promise<MemberDTO[]> => {
  const members = await MemberModel.find({}).sort({ lastName: sort })

  return members.map(m => memberDBOtoDTO(m))
}

const storeMember = async (memberData: StoreMemberDTO): Promise<MemberDTO> => {
  const { area, career, status } = await getReferencedData(memberData)

  const newMember = new MemberModel({
    ...memberData,
    area: new Types.ObjectId(area.id),
    career: new Types.ObjectId(career.id),
    status: new Types.ObjectId(status.id)
  })

  await newMember.save()

  const member = await getMember(newMember.id)

  if (!member)
    throw new Error('Something went wrong while saving the new member')

  return member
}

const storeMembers = async (
  membersData: StoreMemberDTO[],
  sort: 1 | -1 = -1
): Promise<MemberDTO[]> => {
  const session = await startSession()

  session.startTransaction()

  const membersDataWithReferencedData = await Promise.all(
    membersData.map(async memberData => {
      const { area, career, status } = await getReferencedData(memberData)

      return {
        ...memberData,
        area,
        career,
        status
      }
    })
  )
  const newMembers = await MemberModel.create(membersDataWithReferencedData)

  await session.commitTransaction()
  await session.endSession()

  const memberIDs = newMembers.map(member => member._id)
  const members = await MemberModel.find({
    _id: {
      $in: memberIDs
    }
  })
    .sort({ lastName: sort })
    .populate('area')
    .populate('career')
    .populate('status')
    .exec()

  return members.map(m => memberDBOtoDTO(m))
}

const updateMember = async (
  memberData: UpdateMemberDTO
): Promise<MemberDTO> => {
  const { id, ...rest } = memberData
  let area: AreaDTO | null = null
  let career: CareerDTO | null = null
  let status: StatusDTO | null = null

  if (rest.area) {
    area = await getArea(rest.area)

    if (!area) throw new Error('The requested area does not exists')
  }

  if (rest.career) {
    career = await getCareer(rest.career)

    if (!career) throw new Error('The requested status does not exists')
  }

  if (rest.status) {
    status = await getOneStatusByName(rest.status)

    if (!status) throw new Error('The requested status does not exists')
  }

  await MemberModel.findByIdAndUpdate(id, {
    ...rest,
    ...(area && { area: new Types.ObjectId(area.id) }),
    ...(career && { career: new Types.ObjectId(career.id) }),
    ...(status && { status: new Types.ObjectId(status.id) })
  })

  const member = await getMember(id)

  if (!member) throw new Error('There was an error while updating the user')

  return member
}

const getReferencedData = async (
  memberData: StoreMemberDTO
): Promise<{
  area: Types.ObjectId
  career: Types.ObjectId
  status: Types.ObjectId
}> => {
  const area = await getArea(memberData.area)

  if (!area) throw new Error('The requested area does not exists')

  const career = await getCareer(memberData.career)

  if (!career) throw new Error('The requested status does not exists')

  const status = await getOneStatusByName(memberData.status)

  if (!status) throw new Error('The requested status does not exists')

  return {
    area: new Types.ObjectId(area.id),
    career: new Types.ObjectId(career.id),
    status: new Types.ObjectId(status.id)
  }
}

export {
  memberDBOtoDTO,
  getMember,
  getMembers,
  getOnlyMembers,
  storeMember,
  storeMembers,
  updateMember
}
