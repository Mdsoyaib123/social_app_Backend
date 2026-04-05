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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const post_service_1 = require("./post.service");
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
// CREATE POST
const createPost = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const file = req.file;
    const postImg = file.path;
    const result = yield post_service_1.PostService.createPost(req.body, postImg, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: result,
    });
}));
// FEED
const getFeed = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const result = yield post_service_1.PostService.getFeed((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, page, limit);
    res.status(200).json(Object.assign({ success: true, message: "Feed fetched successfully" }, result));
}));
// SINGLE POST
const getSinglePost = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const result = yield post_service_1.PostService.getSinglePost(req.params.postId, (_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
    res.status(200).json({
        success: true,
        data: result,
    });
}));
// UPDATE
const updatePost = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    console.log("Update controller post called with body:", req.body);
    const file = req.file;
    const postImg = file === null || file === void 0 ? void 0 : file.path; // ✅ safe optional chaining
    const result = yield post_service_1.PostService.updatePost(req.params.postId, (_d = req.user) === null || _d === void 0 ? void 0 : _d._id, req.body, postImg);
    res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data: result,
    });
}));
// DELETE
const deletePost = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const result = yield post_service_1.PostService.deletePost(req.params.postId, (_e = req.user) === null || _e === void 0 ? void 0 : _e._id);
    res.status(200).json({
        success: true,
        message: "Post deleted successfully",
        data: result,
    });
}));
exports.PostController = {
    createPost,
    getFeed,
    getSinglePost,
    updatePost,
    deletePost,
};
