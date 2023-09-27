import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    login: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    passwordHash: { type: String, require: true },
    avatarURL: String,
  },
  { timestamps: true },
);

export default mongoose.model("User", UserSchema);
