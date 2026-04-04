
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import { UserModel } from "./user.schema";

const createUser = async (payload: TUser) => {
  const existingUser = await UserModel.findOne({ email: payload.email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await UserModel.create(payload);
  return user;
};

const getAllUsers = async () => {
  return await UserModel.find({ isDeleted: false });
};

const getSingleUser = async (id: string) => {
  console.log("id from service ", id);
  const user = await UserModel.findById(id);
  if (!user) throw new Error("User not found");
  return user;
};

const updateUser = async (id: string, payload: Partial<TUser>) => {
  const { email, ...rest } = payload;
  const user = await UserModel.findByIdAndUpdate(id, rest, {
    new: true,
    runValidators: true,
  });

  if (!user) throw new Error("User not found");
  return user;
};

const deleteUser = async (id: string) => {
  const user = await UserModel.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");
  return user;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};