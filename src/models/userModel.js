import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [false, "Please enter a username"],
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: [true, "Please enter the email address"],
    unique: [true, "email already exists"],
  },
  image: {
    type: String,
    required: false,
  },

  hashedPassword: {
    type: String,
    required: false,
  },
  oauthProviders: {
    provider: {
      type: String,
      required: false,
    },
    providerId: {
      type: String,
      required: false,
    },
    Tokens: {
      accessToken: {
        type: String,
        required: false,
      },
      refreshToken: {
        type: String,
      },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiration: Date,
  verifyToken: String,
  verifyTokenExpiration: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
//
export default User;
