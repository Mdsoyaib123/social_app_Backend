import express from "express";
import { PostController } from "./post.controller";
import auth from "../../middlewares/auth";
import { createUploader } from "../../utils/cloudinary";

const router = express.Router();
const imageUpload = createUploader("posts")


router.post("/create", auth(), imageUpload.single('image'), PostController.createPost);
router.get("/feeds", auth(), PostController.getFeed);
router.get("/getSingle/:postId", auth(), PostController.getSinglePost);
router.patch("/updateVisibility", auth(), PostController.updatePostVisibility);
router.patch("/updatePost/:postId", auth(), imageUpload.single('image'), PostController.updatePost);
router.delete("/deletePost/:postId", auth(), PostController.deletePost);

const PostRoutes = router;

export default PostRoutes;