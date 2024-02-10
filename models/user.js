import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    _id: { type: String, unique: [true, '_id should be unique'] },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: [true, 'Email already exists!'],
      required: [true, 'Email is required!'],
    },
    email: {
      type: String,
      unique: [true, 'Email already exists!'],
      required: [true, 'Email is required!'],
    },
    liked: [
      {
        raise: {
          type: Schema.Types.ObjectId,
          ref: 'Raise',
        },
        note: { type: String },
      },
    ],
    bann: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: 'user',
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const User = models.User || model('User', UserSchema);

export default User;
