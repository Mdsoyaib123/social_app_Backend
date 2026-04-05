"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const like_controller_1 = require("./like.controller");
const router = express_1.default.Router();
// TOGGLE LIKE / UNLIKE
router.post("/", (0, auth_1.default)(), like_controller_1.LikeController.toggleLike);
// GET LIKE COUNT
router.get("/count", (0, auth_1.default)(), like_controller_1.LikeController.getLikeCount);
// GET USERS WHO LIKED
router.get("/users", (0, auth_1.default)(), like_controller_1.LikeController.getLikes);
exports.LikeRoutes = router;
