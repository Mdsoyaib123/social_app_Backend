import { Types } from "mongoose";

export type TPost = {
  authorId: Types.ObjectId;
  text?: string;
  image?: string;
  isPrivate: boolean;
};