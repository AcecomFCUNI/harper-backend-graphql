import { Document, Types } from 'mongoose'

import { ProjectDTO, StoreProjectDTO, UpdateProjectDTO } from 'schemas'
import { areaDBOtoDTO } from './area'
import { memberDBOtoDTO } from './member'
import { ProjectModel } from '..'

const projectDBOtoDTO = (
  projectDBO: Document<unknown, unknown, ProjectAreaParticipantsDBO> &
    ProjectAreaParticipantsDBO & { _id: Types.ObjectId }
): ProjectDTO => {
  if (!projectDBO.area) throw new Error('Missing area')

  if (!projectDBO.participants) throw new Error('Missing members')

  return {
    ...projectDBO.toObject(),
    area:
      projectDBO.area instanceof Types.ObjectId
        ? projectDBO.area.toString()
        : areaDBOtoDTO(projectDBO.area),
    participants:
      projectDBO.participants[0] instanceof Types.ObjectId
        ? projectDBO.participants.map(p => (p as Types.ObjectId).toString())
        : projectDBO.participants.map(p =>
            memberDBOtoDTO(
              p as Document<unknown, unknown, MemberDBO> &
                MemberDBO & {
                  _id: Types.ObjectId
                }
            )
          ),
    createdAt: projectDBO.createdAt.toISOString(),
    updatedAt: projectDBO.updatedAt.toISOString()
  }
}

const getProject = async (
  id: string,
  sort: 1 | -1 = -1
): Promise<ProjectDTO | null> => {
  const project = await ProjectModel.findById(id)
    .sort({ name: sort })
    .populate('area')
    .populate('participants')

  return project ? projectDBOtoDTO(project) : null
}

const getProjectsPerArea = async (
  areaId: string,
  sort: 1 | -1 = -1
): Promise<ProjectDTO[]> => {
  const projects = await ProjectModel.find({ area: areaId })
    .sort({ name: sort })
    .populate('area')
    .populate('participants')

  return projects.map(p => projectDBOtoDTO(p))
}

const storeProject = async (
  projectData: StoreProjectDTO
): Promise<ProjectDTO> => {
  const newProject = new ProjectModel(projectData)

  await newProject.save()

  const project = await getProject(newProject.id)

  if (!project)
    throw new Error('Something went wrong while saving the new project')

  return project
}

const updateProject = async (
  projectData: UpdateProjectDTO
): Promise<ProjectDTO | null> => {
  const { id, ...rest } = projectData
  const project = await ProjectModel.findByIdAndUpdate(id, rest, { new: true })

  return project ? projectDBOtoDTO(project) : null
}

export {
  projectDBOtoDTO,
  getProject,
  getProjectsPerArea,
  storeProject,
  updateProject
}
