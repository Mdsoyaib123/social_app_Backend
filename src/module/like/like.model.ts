import { Schema, model } from "mongoose";
import { TLike } from "./like.interface";

const likeSchema = new Schema<TLike>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    targetType: {
      type: String,
      enum: ["Post", "Comment"],
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 🚀 prevent duplicate like
likeSchema.index(
  { userId: 1, targetId: 1, targetType: 1 },
  { unique: true }
);

export const LikeModel = model<TLike>("Like", likeSchema);