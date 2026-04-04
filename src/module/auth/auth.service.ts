import bcrypt from "bcryptjs";
import { AppError } from "../../utils/app_error";

import { TLoginPayload } from "./auth.interface";
import { jwtHelpers } from "../../utils/JWT";
import { configs } from "../../configs";
import { Secret } from "jsonwebtoken";
import { UserModel } from "../user/user.schema";


// login user
const login_user_from_db = async (
  payload: TLoginPayload,
) => {
  console.log("payload from service ", payload);
  const isExistAccount: any = await UserModel.findOne({
    email: payload?.email,
  }).select("+password");
  
  if (!isExistAccount) {
    throw new AppError("User not found", 404);
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    isExistAccount?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError("Invalid password", 401);
  }

  const accessToken = jwtHelpers.generateToken(
    {
      _id: isExistAccount._id,
      email: isExistAccount.email,
    },
    configs.jwt.accessToken_secret as Secret,
    configs.jwt.accessToken_expires as string,
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      _id: isExistAccount._id,
      email: isExistAccount.email,
    },
    configs.jwt.refreshToken_secret as Secret,
    configs.jwt.refreshToken_expires as string,
  );
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    userId: isExistAccount._id,
  };
};

const refresh_token_from_db = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      configs.jwt.refreshToken_secret as Secret,
    );
  } catch (err) {
    throw new Error("You are not authorized!");
  }

  const userData: any = await UserModel.findOne({
    email: decodedData.email,
  });
  if (!userData) {
    throw new AppError("User not found", 404);
  }

  const accessToken = jwtHelpers.generateToken(
    { _id: userData?._id, email: userData?.email },
    configs?.jwt.accessToken_secret as string,
    configs.jwt.accessToken_expires as string,
  );

  return { accessToken };
};
export const auth_services = {
  login_user_from_db,
  refresh_token_from_db,
};
