import express from "express";
import { PostController } from "./post.controller";
import auth from "../../middlewares/auth";
import { createUploader } from "../../utils/cloudinary";

const router = express.Router();

const imageUpload = createUploader("posts").single("image");


router.post("/", auth(), imageUpload, PostController.createPost);
router.get("/feeds", auth(), PostController.getFeed);
router.get("/:postId", auth(), PostController.getSinglePost);
router.patch("/:postId", auth(), PostController.updatePost);
router.delete("/:postId", auth(), PostController.deletePost);

export const PostRoutes = router;