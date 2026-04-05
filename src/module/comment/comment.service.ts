import { CommentModel } from "./comment.model";
import { PostModel } from "../post/post.model";
import path from "path";

type CreateCommentPayload = {
  postId: string;
  text: string;
  parentCommentId?: string | null;
};

// CREATE COMMENT / REPLY
const createComment = async (
  payload: CreateCommentPayload,
  userId: string
) => {
  const post = await PostModel.findById(payload.postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // 🔒 private post restriction
  if (post.isPrivate && post.authorId.toString() !== userId) {
    throw new Error("You cannot comment on this private post");
  }

  return await CommentModel.create({
    postId: payload.postId,
    authorId: userId,
    text: payload.text,
    parentCommentId: payload.parentCommentId || null,
  });
};

// GET COMMENTS (PARENT ONLY)
const getCommentsByPost = async (postId: string) => {
  return await CommentModel.find({
    postId,
    parentCommentId: null,
  })
    .populate("authorId", "firstName lastName")
    .sort({ createdAt: -1 });
};

// GET REPLIES
const getReplies = async (commentId: string) => {
  return await CommentModel.find({
    parentCommentId: commentId,
  })
    .populate("authorId", "firstName lastName")
    .sort({ createdAt: 1 });
};

// UPDATE COMMENT
const updateComment = async (
  commentId: string,
  userId: string,
  text: string
) => {
  const comment = await CommentModel.findById(commentId);

  if (!comment) throw new Error("Comment not found");

  if (comment.authorId.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  comment.text = text;
  await comment.save();

  return comment;
};

const deleteComment = async (commentId: string, userId: string) => {
  const comment = await CommentModel.findById(commentId);

  if (!comment) throw new Error("Comment not found");

  if (comment.authorId.toString() !== userId) {
    throw new Error("Unauthorized");
  }

  const idsToDelete: string[] = [commentId];

  // BFS traversal
  for (let i = 0; i < idsToDelete.length; i++) {
    const children = await CommentModel.find({
      parentCommentId: idsToDelete[i],
    }).select("_id");

    children.forEach((child) => {
      idsToDelete.push(child._id.toString());
    });
  }

  // delete all at once
  await CommentModel.deleteMany({
    _id: { $in: idsToDelete },
  });

  return true;
};

export const CommentService = {
  createComment,
  getCommentsByPost,
  getReplies,
  updateComment,
  deleteComment,
};