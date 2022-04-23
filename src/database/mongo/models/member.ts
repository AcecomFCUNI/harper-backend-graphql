import { model, Schema } from 'mongoose'

const MemberSchema = new Schema<MemberDBO>(
  {
    area: {
      type: Schema.Types.ObjectId,
      ref: 'areas',
      required: true
    },
    birthday: {
      type: Date,
      required: true
    },
    career: {
      type: Schema.Types.ObjectId,
      ref: 'careers',
      required: true
    },
    code: {
      type: String,
      maxlength: 9,
      minlength: 9,
      required: true,
      unique: true
    },
    email: [
      {
        type: String,
        required: true
      }
    ],
    git: String,
    key: Boolean,
    lastName: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    phone: [
      {
        type: String,
        unique: true
      }
    ],
    photo: {
      default: '',
      type: String
    },
    status: {
      ref: 'status',
      required: true,
      type: Schema.Types.ObjectId
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

const MemberModel = model<MemberDBO>('members', MemberSchema)

export { MemberModel }
