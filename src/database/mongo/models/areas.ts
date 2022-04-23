import { model, Schema } from 'mongoose'

const AreaSchema = new Schema<AreaDBO>(
  {
    abstract: {
      required: true,
      type: String
    },
    code: {
      default: 1,
      type: Number
    },
    image: {
      default: '',
      type: String
    },
    name: {
      required: true,
      type: String,
      unique: true
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

const AreaModel = model<AreaDBO>('areas', AreaSchema)

export { AreaModel }
