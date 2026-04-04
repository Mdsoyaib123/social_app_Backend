import { Types } from "mongoose";

export type TComment = {
  postId: Types.ObjectId;
  authorId: Types.ObjectId;
  text: string;
  parentCommentId?: Types.ObjectId | null;
};