"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const comment_controller_1 = require("./comment.controller");
const router = express_1.default.Router();
// CREATE COMMENT
router.post("/create/:postId", (0, auth_1.default)(), comment_controller_1.CommentController.createComment);
// GET COMMENTS OF POST
router.get("/post/:postId", (0, auth_1.default)(), comment_controller_1.CommentController.getCommentsByPost);
// GET REPLIES
router.get("/replies/:commentId", (0, auth_1.default)(), comment_controller_1.CommentController.getReplies);
// UPDATE COMMENT
router.patch("/update/:commentId", (0, auth_1.default)(), comment_controller_1.CommentController.updateComment);
// DELETE COMMENT
router.delete("/delete/:commentId", (0, auth_1.default)(), comment_controller_1.CommentController.deleteComment);
exports.CommentRoutes = router;
