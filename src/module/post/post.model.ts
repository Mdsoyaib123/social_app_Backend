import { Schema, model } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>(
    {
        authorId: {
            type: Schema.Types.ObjectId,
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
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


export const PostModel = model("Post", postSchema);