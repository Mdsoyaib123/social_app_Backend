"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeModel = void 0;
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    targetId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    targetType: {
        type: String,
        enum: ["Post", "Comment"],
        required: true,
        index: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// 🚀 prevent duplicate like
likeSchema.index({ userId: 1, targetId: 1, targetType: 1 }, { unique: true });
exports.LikeModel = (0, mongoose_1.model)("Like", likeSchema);
