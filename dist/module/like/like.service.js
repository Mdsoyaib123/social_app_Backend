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
exports.LikeService = void 0;
const like_model_1 = require("./like.model");
// 🔥 TOGGLE LIKE / UNLIKE
const toggleLike = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield like_model_1.LikeModel.findOne({
        userId,
        targetId: payload.targetId,
        targetType: payload.targetType,
    });
    if (existing) {
        yield like_model_1.LikeModel.deleteOne({ _id: existing._id });
        return {
            liked: false,
            message: "Unliked successfully",
        };
    }
    yield like_model_1.LikeModel.create({
        userId,
        targetId: payload.targetId,
        targetType: payload.targetType,
    });
    return {
        liked: true,
        message: "Liked successfully",
    };
});
// 🔥 GET LIKE COUNT
const getLikeCount = (targetId, targetType) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield like_model_1.LikeModel.countDocuments({
        targetId,
        targetType,
    });
    return { count };
});
// 🔥 GET USERS WHO LIKED
const getLikes = (targetId, targetType) => __awaiter(void 0, void 0, void 0, function* () {
    return yield like_model_1.LikeModel.find({
        targetId,
        targetType,
    }).populate("userId", "firstName lastName email");
});
exports.LikeService = {
    toggleLike,
    getLikeCount,
    getLikes,
};
