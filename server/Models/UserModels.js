import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Будь ласка, додайте повне ім'я"],
    },
    email: {
      type: String,
      required: [true, 'Будь ласка, додайте електронну пошту'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Будь ласка, додайте пароль'],
      minlength: [6, 'Пароль повинен містити щонайменше 6 символів'],
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    likedMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema);
