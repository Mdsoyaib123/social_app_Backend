"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = require("./post.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const cloudinary_1 = require("../../utils/cloudinary");
const router = express_1.default.Router();
const imageUpload = (0, cloudinary_1.createUploader)("posts");
router.post("/create", (0, auth_1.default)(), imageUpload.single('image'), post_controller_1.PostController.createPost);
router.get("/feeds", (0, auth_1.default)(), post_controller_1.PostController.getFeed);
router.get("/getSingle/:postId", (0, auth_1.default)(), post_controller_1.PostController.getSinglePost);
router.patch("/updatePost/:postId", (0, auth_1.default)(), imageUpload.single('image'), post_controller_1.PostController.updatePost);
router.delete("/deletePost/:postId", (0, auth_1.default)(), post_controller_1.PostController.deletePost);
const PostRoutes = router;
exports.default = PostRoutes;
