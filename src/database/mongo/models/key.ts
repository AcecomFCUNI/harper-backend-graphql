import { model, Schema } from 'mongoose'

const KeySchema = new Schema<KeyDBO>(
  {
    delivered: {
      default: false,
      type: Boolean
    },
    key: {
      type: String,
      unique: true
    },
    purpose: {
      type: String,
      enum: ['dev', 'prod'],
      default: 'dev'
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    },
    versionKey: false,
    toObject: {
      transform: (_, ret) => {
        ret.id = ret._id.toString()
        delete ret._id
      }
    }
  }
)

const KeyModel = model<KeyDBO>('keys', KeySchema)

export { KeyModel }
