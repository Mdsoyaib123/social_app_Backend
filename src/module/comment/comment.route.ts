import express from "express";
import auth from "../../middlewares/auth";
import { CommentController } from "./comment.controller";

const router = express.Router();

// CREATE COMMENT
router.post("/create/:postId", auth(), CommentController.createComment);

// GET COMMENTS OF POST
router.get("/post/:postId", auth(), CommentController.getCommentsByPost);

// GET REPLIES
router.get("/replies/:commentId", auth(), CommentController.getReplies);

// UPDATE COMMENT
router.patch("/update/:commentId", auth(), CommentController.updateComment);

// DELETE COMMENT
router.delete("/delete/:commentId", auth(), CommentController.deleteComment);

export const CommentRoutes = router;