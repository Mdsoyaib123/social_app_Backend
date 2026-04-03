import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const user_schema = new Schema<TUser>(
  {
    fristName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const User_Model = model("user", user_schema);
