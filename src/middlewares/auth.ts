import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app_error";
import { configs } from "../configs";
import { jwtHelpers, JwtPayloadType } from "../utils/JWT";
import { UserModel } from "../module/user/user.schema";


const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      // console.log("token from auth middleware ", token);
      if (!token) {
        throw new AppError("You are not authorize!!", 401);
      }
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        configs.jwt.accessToken_secret as string
      );

      // check user
      const isUserExist = await UserModel.findOne({
        email: verifiedUser?.email,
      }).lean();

      if (!isUserExist) {
        throw new AppError("user not found !", 404);
      }

      req.user = verifiedUser as JwtPayloadType;

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
