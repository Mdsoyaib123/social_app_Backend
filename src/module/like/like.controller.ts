import { Request, Response } from "express";
import catchAsync from "../../utils/catch_async";

import { LikeService } from "./like.service";
import manageResponse from "../../utils/manage_response";

// TOGGLE LIKE
const toggleLike = catchAsync(async (req: Request, res: Response) => {
  const result = await LikeService.toggleLike(
    {
      targetId: req.body.targetId,
      targetType: req.body.targetType,
    },
    req.user?._id as string
  );

  return manageResponse(res, {
    success: true,
    statusCode: 200,
    message: result.message,
    data: result,
  });
});

// GET LIKE COUNT
const getLikeCount = catchAsync(async (req: Request, res: Response) => {
  const { targetId, targetType } = req.query;

  const result = await LikeService.getLikeCount(
    targetId as string,
    targetType as string
  );

  return manageResponse(res, {
    success: true,
    statusCode: 200,
    message: "Like count fetched",
    data: result,
  });
});

// GET USERS WHO LIKED
const getLikes = catchAsync(async (req: Request, res: Response) => {
  const { targetId, targetType } = req.query;

  const result = await LikeService.getLikes(
    targetId as string,
    targetType as string
  );

  return manageResponse(res, {
    success: true,
    statusCode: 200,
    message: "Likes fetched",
    data: result,
  });
});

export const LikeController = {
  toggleLike,
  getLikeCount,
  getLikes,
};