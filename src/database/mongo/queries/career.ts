import { Document, Types } from 'mongoose'

import { CareerDTO, StoreCareerDTO, UpdateCareerDTO } from 'schemas'
import { CareerModel } from '..'

const careerDBOtoDTO = (
  careerDBO: Document<unknown, unknown, AreaDBO> &
    CareerDBO & { _id: Types.ObjectId }
): CareerDTO => ({
  ...careerDBO.toObject(),
  createdAt: careerDBO.createdAt.toISOString(),
  updatedAt: careerDBO.updatedAt.toISOString()
})

const getCareer = async (code: string): Promise<CareerDTO | null> => {
  const career = await CareerModel.findOne({ code })

  return career ? careerDBOtoDTO(career) : null
}

const getCareers = async (sort: 1 | -1 = -1): Promise<CareerDTO[]> => {
  const careers = await CareerModel.find({}).sort({ code: sort })

  return careers.map(c => careerDBOtoDTO(c))
}

const storeCareer = async (careerData: StoreCareerDTO): Promise<CareerDTO> => {
  const career = new CareerModel(careerData)

  await career.save()

  return careerDBOtoDTO(career)
}

const updateCareer = async (
  careerData: UpdateCareerDTO
): Promise<CareerDTO | null> => {
  const { id, ...rest } = careerData
  const career = await CareerModel.findByIdAndUpdate(id, rest, { new: true })

  return career ? careerDBOtoDTO(career) : null
}

export { careerDBOtoDTO, getCareer, getCareers, storeCareer, updateCareer }
