"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    authorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    text: {
        type: String,
        trim: true,
        maxlength: 1000,
    },
    image: {
        type: String,
        trim: true,
    },
    isPrivate: {
        type: Boolean,
        default: false,
        index: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.PostModel = (0, mongoose_1.model)("Post", postSchema);
