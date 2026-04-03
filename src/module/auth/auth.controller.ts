
import { Request, Response } from "express";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { auth_services } from "./auth.service";
import { configs } from "../../configs";

const login_user = catchAsync(async (req: Request, res: Response) => {
  // console.log(' req body form controller ',req.body)
  const ipAddress =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0] ||
    req.socket.remoteAddress ||
    req.ip;

  // console.log("ip address", ipAddress);

  const result = await auth_services.login_user_from_db(
    req.body,
    ipAddress as string,
  );

  // console.log(' login result from controller ',result)

  res.cookie("refreshToken", result.refreshToken, {
    secure: configs.env == "production",
    httpOnly: true,
  });
  manageResponse(res, {
    statusCode: 200,
    success: true,
    message: "User is logged in successful !",
    data: {
      accessToken: result.accessToken,
      refresh_token: result.refreshToken,
      role: result?.role,
      userId: result?.userId,
    },
  });
});

const refresh_token = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  console.log("refresh token form cookies", refreshToken);
  const result = await auth_services.refresh_token_from_db(refreshToken);
  manageResponse(res, {
    statusCode: 200,
    success: true,
    message: "Refresh token generated successfully!",
    data: result,
  });
});


export const auth_controllers = {
  login_user,
  refresh_token,
};
