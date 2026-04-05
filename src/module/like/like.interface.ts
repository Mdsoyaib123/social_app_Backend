import { Types } from "mongoose";

export type TLike = {
  userId: Types.ObjectId;
  targetId: Types.ObjectId;
  targetType: "Post" | "Comment";
};