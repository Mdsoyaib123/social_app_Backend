import bcrypt from "bcryptjs";
import { AppError } from "../../utils/app_error";
import { User_Model } from "../user/user.schema";
import { TLoginPayload } from "./auth.interface";
import { jwtHelpers } from "../../utils/JWT";
import { configs } from "../../configs";
import { Secret } from "jsonwebtoken";


// login user
const login_user_from_db = async (
  payload: TLoginPayload,
  ipAddress: string,
) => {
  const isExistAccount: any = await User_Model.findOne({
    email: payload?.email,
  });

  if (isExistAccount) {
    await User_Model.findOneAndUpdate(
      { email: payload?.email },
      { ipAddress: ipAddress },
      { new: true },
    );
  }


  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    isExistAccount?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError("Invalid password", 401);
  }

  await User_Model.findOneAndUpdate(
    { email: payload.email },
    {
      fcmToken: payload?.fcmToken,
      latitude: payload?.latitude,
      longitude: payload?.longitude,
    },

    { new: true },
  );

  const accessToken = jwtHelpers.generateToken(
    {
      userId: isExistAccount._id,
      email: isExistAccount.email,
      role: isExistAccount.role,
    },
    configs.jwt.accessToken_secret as Secret,
    configs.jwt.accessToken_expires as string,
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      userId: isExistAccount._id,
      email: isExistAccount.email,
      role: isExistAccount.role,
    },
    configs.jwt.refreshToken_secret as Secret,
    configs.jwt.refreshToken_expires as string,
  );
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    role: isExistAccount.role,
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

  const userData: any = await User_Model.findOne({
    email: decodedData.email,
  });

  const accessToken = jwtHelpers.generateToken(
    { userId: userData?._id, email: userData?.email, role: userData?.role },
    configs?.jwt.accessToken_secret as string,
    configs.jwt.accessToken_expires as string,
  );

  return { accessToken };
};
export const auth_services = {
  login_user_from_db,
  refresh_token_from_db,
};
