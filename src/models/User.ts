import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  fullname: string;
  phone: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullname: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error: any) {
    console.log(error.message);
  }
});

const User =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default User;
