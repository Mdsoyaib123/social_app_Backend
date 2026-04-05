import { LikeModel } from "./like.model";

type ToggleLikePayload = {
  targetId: string;
  targetType: "Post" | "Comment";
};

// 🔥 TOGGLE LIKE / UNLIKE
const toggleLike = async (payload: ToggleLikePayload, userId: string) => {
  const existing = await LikeModel.findOne({
    userId,
    targetId: payload.targetId,
    targetType: payload.targetType,
  });

  if (existing) {
    await LikeModel.deleteOne({ _id: existing._id });

    return {
      liked: false,
      message: "Unliked successfully",
    };
  }

  await LikeModel.create({
    userId,
    targetId: payload.targetId,
    targetType: payload.targetType,
  });

  return {
    liked: true,
    message: "Liked successfully",
  };
};

// 🔥 GET LIKE COUNT
const getLikeCount = async (targetId: string, targetType: string) => {
  const count = await LikeModel.countDocuments({
    targetId,
    targetType,
  });

  return { count };
};

// 🔥 GET USERS WHO LIKED
const getLikes = async (targetId: string, targetType: string) => {
  return await LikeModel.find({
    targetId,
    targetType,
  }).populate("userId", "firstName lastName email");
};

export const LikeService = {
  toggleLike,
  getLikeCount,
  getLikes,
};