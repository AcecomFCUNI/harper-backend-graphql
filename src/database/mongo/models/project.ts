import { model, Schema } from 'mongoose'

const ProjectSchema = new Schema<ProjectDBO>(
  {
    area: {
      ref: 'areas',
      required: true,
      type: Schema.Types.ObjectId
    },
    description: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String,
      unique: true
    },
    participants: [
      {
        ref: 'members',
        required: true,
        type: Schema.Types.ObjectId
      }
    ],
    repo: [
      {
        default: '',
        type: String
      }
    ],
    topic: {
      required: true,
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toObject: {
      transform: (_, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
      }
    }
  }
)

const ProjectModel = model<ProjectDBO>('projects', ProjectSchema)

export { ProjectModel }
