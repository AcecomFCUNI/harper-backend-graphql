import { Document, Types } from 'mongoose'

import { StatusDTO, StoreStatusDTO, UpdateStatusDTO } from 'schemas'
import { StatusModel } from '..'

const statusDBOtoDTO = (
  statusDBO: Document<unknown, unknown, StatusDBO> &
    StatusDBO & { _id: Types.ObjectId }
): StatusDTO => ({
  ...statusDBO.toObject(),
  createdAt: statusDBO.createdAt.toISOString(),
  updatedAt: statusDBO.updatedAt.toISOString()
})

const getOneStatus = async (id: string): Promise<StatusDTO | null> => {
  const status = await StatusModel.findById(id)

  return status ? statusDBOtoDTO(status) : null
}

const getOneStatusByName = async (
  statusName: string
): Promise<StatusDTO | null> => {
  const status = await StatusModel.findOne({ name: statusName })

  return status ? statusDBOtoDTO(status) : null
}

const getAllStatus = async (sort: 1 | -1 = -1): Promise<StatusDTO[]> => {
  const status = await StatusModel.find({}).sort({ name: sort })

  return status.map(s => statusDBOtoDTO(s))
}

const storeStatus = async (statusData: StoreStatusDTO): Promise<StatusDTO> => {
  const status = new StatusModel(statusData)

  await status.save()

  return statusDBOtoDTO(status)
}

const updateStatus = async (
  statusData: UpdateStatusDTO
): Promise<StatusDTO | null> => {
  const { id, ...rest } = statusData
  const status = await StatusModel.findByIdAndUpdate(id, rest, { new: true })

  return status ? statusDBOtoDTO(status) : null
}

export {
  statusDBOtoDTO,
  getOneStatus,
  getOneStatusByName,
  getAllStatus,
  storeStatus,
  updateStatus
}
