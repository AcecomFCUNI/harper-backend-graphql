import { model, Schema } from 'mongoose'

const CareerSchema = new Schema<CareerDBO>(
  {
    code: {
      maxlength: 2,
      minlength: 2,
      type: String,
      unique: true
    },
    name: {
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

const CareerModel = model<CareerDBO>('careers', CareerSchema)

export { CareerModel }
