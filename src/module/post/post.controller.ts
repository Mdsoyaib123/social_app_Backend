import { Request, Response } from "express";
import { PostService } from "./post.service";
import catchAsync from "../../utils/catch_async";

// CREATE POST
const createPost = catchAsync(async (req: Request, res: Response) => {

    const file = req.file as unknown as {
        [fieldname: string]: Express.Multer.File[];
    };
    const postImg = file.path as unknown as string
    const result = await PostService.createPost(req.body, postImg, req.user?._id);

    res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: result,
    });
});

// FEED
const getFeed = catchAsync(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await PostService.getFeed(req.user?._id, page, limit);

    res.status(200).json({
        success: true,
        message: "Feed fetched successfully",
        ...result,
    });
});

// SINGLE POST
const getSinglePost = catchAsync(async (req: Request, res: Response) => {
    const result = await PostService.getSinglePost(req.params.postId as string, req.user?._id as string);

    res.status(200).json({
        success: true,
        data: result,
    });
});

// UPDATE
const updatePost = catchAsync(async (req: Request, res: Response) => {
    console.log("Update controller post called with body:", req.body);

    const file = req.file as unknown as Express.Multer.File | undefined;

    const postImg = file?.path; // ✅ safe optional chaining

    const result = await PostService.updatePost(
        req.params.postId as string,
        req.user?._id as string,
        req.body,
        postImg
    );

    res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data: result,
    });
});

// DELETE
const deletePost = catchAsync(async (req: Request, res: Response) => {
    const result = await PostService.deletePost(req.params.postId as string, req.user?._id as string);

    res.status(200).json({
        success: true,
        message: "Post deleted successfully",
        data: result,
    });
});

export const PostController = {
    createPost,
    getFeed,
    getSinglePost,
    updatePost,
    deletePost,
};