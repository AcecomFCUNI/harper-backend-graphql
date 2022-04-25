import { Document, Types } from 'mongoose'

import { AreaDTO, StoreAreaDTO, UpdateAreaDTO } from 'schemas'
import { AreaModel } from '..'

const areaDBOtoDTO = (
  areaDBO: Document<unknown, unknown, AreaDBO> &
    AreaDBO & { _id: Types.ObjectId }
): AreaDTO => ({
  ...areaDBO.toObject(),
  createdAt: areaDBO.createdAt.toISOString(),
  updatedAt: areaDBO.updatedAt.toISOString()
})

const getArea = async (code: number): Promise<AreaDTO | null> => {
  const result = await AreaModel.findOne({ code })

  return result ? areaDBOtoDTO(result) : null
}

const getAreas = async (sort: 1 | -1 = -1): Promise<AreaDTO[]> => {
  const areas = await AreaModel.find({}).sort({ code: sort })

  return areas.map(a => areaDBOtoDTO(a))
}

const storeArea = async (areaData: StoreAreaDTO): Promise<AreaDTO> => {
  let code = 1
  const areas = await getAreas()

  if (areas.length > 0) code = areas[0].code + 1

  const area = new AreaModel({ ...areaData, code })

  await area.save()

  return areaDBOtoDTO(area)
}

const updateArea = async (areaData: UpdateAreaDTO): Promise<AreaDTO | null> => {
  const { id, ...rest } = areaData
  const area = await AreaModel.findByIdAndUpdate(id, rest, { new: true })

  return area ? areaDBOtoDTO(area) : null
}

export { getArea, getAreas, storeArea, updateArea }
