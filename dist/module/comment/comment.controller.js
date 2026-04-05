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
exports.CommentController = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
const comment_service_1 = require("./comment.service");
const manage_response_1 = __importDefault(require("../../utils/manage_response"));
// safe param helper
const getParam = (param) => Array.isArray(param) ? param[0] : param;
// CREATE COMMENT
const createComment = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const postId = req.params.postId;
    const result = yield comment_service_1.CommentService.createComment({
        postId: postId,
        text: req.body.text,
        parentCommentId: req.body.parentCommentId || null,
    }, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    return (0, manage_response_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "Comment created successfully",
        data: result,
    });
}));
// GET COMMENTS BY POST
const getCommentsByPost = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const result = yield comment_service_1.CommentService.getCommentsByPost(postId);
    return (0, manage_response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Comments fetched successfully",
        data: result,
    });
}));
// GET REPLIES
const getReplies = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    const result = yield comment_service_1.CommentService.getReplies(commentId);
    return (0, manage_response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Replies fetched successfully",
        data: result,
    });
}));
// UPDATE COMMENT
const updateComment = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const commentId = req.params.commentId;
    const result = yield comment_service_1.CommentService.updateComment(commentId, (_b = req.user) === null || _b === void 0 ? void 0 : _b._id, req.body.text);
    return (0, manage_response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Comment updated successfully",
        data: result,
    });
}));
// DELETE COMMENT
const deleteComment = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const commentId = req.params.commentId;
    yield comment_service_1.CommentService.deleteComment(commentId, (_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
    return (0, manage_response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Comment deleted successfully",
    });
}));
exports.CommentController = {
    createComment,
    getCommentsByPost,
    getReplies,
    updateComment,
    deleteComment,
};
