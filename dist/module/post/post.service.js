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
exports.PostService = void 0;
const post_model_1 = require("./post.model");
const createPost = (payload, postImg, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield post_model_1.PostModel.create(Object.assign(Object.assign({}, payload), { authorId: userId, image: postImg }));
});
const getFeed = (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const posts = yield post_model_1.PostModel.find({
        $or: [
            { isPrivate: false }, // public posts
            { authorId: userId }, // user's own private posts
        ],
    })
        .populate("authorId", "firstName lastName email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
    const total = yield post_model_1.PostModel.countDocuments({
        $or: [
            { isPrivate: false },
            { authorId: userId },
        ],
    });
    return {
        data: posts,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
});
const getSinglePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.PostModel.findById(postId).populate("authorId", "firstName lastName email");
    if (!post)
        throw new Error("Post not found");
    // 🔒 private check
    if (post.isPrivate && post.authorId.toString() !== userId) {
        throw new Error("Unauthorized access to private post");
    }
    return post;
});
// UPDATE
const updatePost = (postId, userId, payload, postImg) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.PostModel.findById(postId);
    if (!post)
        throw new Error("Post not found");
    if (post.authorId.toString() !== userId) {
        throw new Error("Unauthorized");
    }
    if (postImg) {
        payload.image = postImg;
    }
    return yield post_model_1.PostModel.findByIdAndUpdate(postId, payload, {
        new: true,
        runValidators: true,
    });
});
// DELETE
const deletePost = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.PostModel.findById(postId);
    if (!post)
        throw new Error("Post not found");
    if (post.authorId.toString() !== userId) {
        throw new Error("Unauthorized");
    }
    return yield post_model_1.PostModel.findByIdAndDelete(postId);
});
exports.PostService = {
    createPost,
    getFeed,
    getSinglePost,
    updatePost,
    deletePost,
};
