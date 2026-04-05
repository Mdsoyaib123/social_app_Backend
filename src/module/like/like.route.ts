import express from "express";
import auth from "../../middlewares/auth";
import { LikeController } from "./like.controller";

const router = express.Router();

// TOGGLE LIKE / UNLIKE
router.post("/", auth(), LikeController.toggleLike);

// GET LIKE COUNT
router.get("/count", auth(), LikeController.getLikeCount);

// GET USERS WHO LIKED
router.get("/users", auth(), LikeController.getLikes);

export const LikeRoutes = router;