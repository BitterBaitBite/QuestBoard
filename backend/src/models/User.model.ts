import { Document, Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = function (user: string) {
  return bcrypt.compare(user, this.password);
};

export const User = model("User", userSchema);
