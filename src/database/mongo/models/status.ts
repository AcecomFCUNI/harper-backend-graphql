import { model, Schema } from 'mongoose'

const StatusSchema = new Schema<StatusDBO>(
  {
    name: {
      required: true,
      type: String,
      unique: true
    }
  },
  {
    versionKey: false,
    toObject: {
      transform: (_, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
      }
    }
  }
)

const StatusModel = model<StatusDBO>('status', StatusSchema)

export { StatusModel }
