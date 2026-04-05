"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const comment_model_1 = require("./comment.model");
const post_model_1 = require("../post/post.model");
// CREATE COMMENT / REPLY
const createComment = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.PostModel.findById(payload.postId);
    if (!post) {
        throw new Error("Post not found");
    }
    // 🔒 private post restriction
    if (post.isPrivate && post.authorId.toString() !== userId) {
        throw new Error("You cannot comment on this private post");
    }
    return yield comment_model_1.CommentModel.create({
        postId: payload.postId,
        authorId: userId,
        text: payload.text,
        parentCommentId: payload.parentCommentId || null,
    });
});
// GET COMMENTS (PARENT ONLY)
const getCommentsByPost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_model_1.CommentModel.find({
        postId,
        parentCommentId: null,
    })
        .populate("authorId", "firstName lastName")
        .sort({ createdAt: -1 });
});
// GET REPLIES
const getReplies = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_model_1.CommentModel.find({
        parentCommentId: commentId,
    })
        .populate("authorId", "firstName lastName")
        .sort({ createdAt: 1 });
});
// UPDATE COMMENT
const updateComment = (commentId, userId, text) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.CommentModel.findById(commentId);
    if (!comment)
        throw new Error("Comment not found");
    if (comment.authorId.toString() !== userId) {
        throw new Error("Unauthorized");
    }
    comment.text = text;
    yield comment.save();
    return comment;
});
const deleteComment = (commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.CommentModel.findById(commentId);
    if (!comment)
        throw new Error("Comment not found");
    if (comment.authorId.toString() !== userId) {
        throw new Error("Unauthorized");
    }
    const idsToDelete = [commentId];
    // BFS traversal
    for (let i = 0; i < idsToDelete.length; i++) {
        const children = yield comment_model_1.CommentModel.find({
            parentCommentId: idsToDelete[i],
        }).select("_id");
        children.forEach((child) => {
            idsToDelete.push(child._id.toString());
        });
    }
    // delete all at once
    yield comment_model_1.CommentModel.deleteMany({
        _id: { $in: idsToDelete },
    });
    return true;
});
exports.CommentService = {
    createComment,
    getCommentsByPost,
    getReplies,
    updateComment,
    deleteComment,
};
