import { Request, Response } from "express";
import catchAsync from "../../utils/catch_async";
import { CommentService } from "./comment.service";
import manageResponse from "../../utils/manage_response";

// safe param helper
const getParam = (param: string | string[] | undefined) =>
    Array.isArray(param) ? param[0] : param;

// CREATE COMMENT
const createComment = catchAsync(async (req: Request, res: Response) => {
    const postId = req.params.postId

    const result = await CommentService.createComment(
        {
            postId: postId as string,
            text: req.body.text,
            parentCommentId: req.body.parentCommentId || null,
        },
        req.user?._id as string
    );

    return manageResponse(res, {
        success: true,
        statusCode: 201,
        message: "Comment created successfully",
        data: result,
    });
});

// GET COMMENTS BY POST
const getCommentsByPost = catchAsync(async (req: Request, res: Response) => {
    const postId = req.params.postId;

    const result = await CommentService.getCommentsByPost(postId as string);

    return manageResponse(res, {
        success: true,
        statusCode: 200,
        message: "Comments fetched successfully",
        data: result,
    });
});

// GET REPLIES
const getReplies = catchAsync(async (req: Request, res: Response) => {
    const commentId = req.params.commentId;

    const result = await CommentService.getReplies(commentId as string);

    return manageResponse(res, {
        success: true,
        statusCode: 200,
        message: "Replies fetched successfully",
        data: result,
    });
});

// UPDATE COMMENT
const updateComment = catchAsync(async (req: Request, res: Response) => {
    const commentId = req.params.commentId;

    const result = await CommentService.updateComment(
        commentId as string,
        req.user?._id as string,
        req.body.text
    );

    return manageResponse(res, {
        success: true,
        statusCode: 200,
        message: "Comment updated successfully",
        data: result,
    });
});

// DELETE COMMENT
const deleteComment = catchAsync(async (req: Request, res: Response) => {
    const commentId = req.params.commentId;

    await CommentService.deleteComment(
        commentId as string,
        req.user?._id as string
    );

    return manageResponse(res, {
        success: true,
        statusCode: 200,
        message: "Comment deleted successfully",
    });
});

export const CommentController = {
    createComment,
    getCommentsByPost,
    getReplies,
    updateComment,
    deleteComment,
};