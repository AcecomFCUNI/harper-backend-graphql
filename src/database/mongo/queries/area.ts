import { Document, Types } from 'mongoose'

import { AreaModel } from '..'
import { AreaDTO } from 'schemas'

const areaDBOtoDTO = (
  areaDBO: Document<unknown, unknown, AreaDBO> &
    AreaDBO & { _id: Types.ObjectId }
): AreaDTO => ({
  ...areaDBO.toObject(),
  createdAt: areaDBO.createdAt.toISOString(),
  updatedAt: areaDBO.updatedAt.toISOString()
})

const getArea = async (name: string): Promise<AreaDTO | null> => {
  const result = await AreaModel.findOne({ name })

  if (!result) throw new Error("The requested area doesn't exist.")

  return result ? areaDBOtoDTO(result) : null
}

const getAreas = async (): Promise<AreaDTO[]> => {
  const areas = await AreaModel.find({})

  return areas.map(a => areaDBOtoDTO(a))
}

const storeArea = async (areaData: AreaDTO): Promise<AreaDTO> => {
  const area = new AreaModel(areaData)

  await area.save()

  return areaDBOtoDTO(area)
}

const updateArea = async (areaData: AreaDTO): Promise<AreaDTO | null> => {
  const { id, ...rest } = areaData
  const area = await AreaModel.findByIdAndUpdate(id, rest, { new: true })

  return area ? areaDBOtoDTO(area) : null
}

export { getArea, getAreas, storeArea, updateArea }
