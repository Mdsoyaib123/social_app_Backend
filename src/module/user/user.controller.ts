import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../utils/catch_async";


// ✅ Create User
const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createUser(req.body);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result,
    });
});

// ✅ Get All Users
const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
    const result = await UserService.getAllUsers();

    res.status(200).json({
        success: true,
        data: result,
    });
});

// ✅ Get Single User
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    console.log("req.user from controller ", req?.user);
    const result = await UserService.getSingleUser(req?.user?._id as string);

    res.status(200).json({
        success: true,
        data: result,
    });
});

// ✅ Update User
const updateUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.updateUser(req.user?._id as string, req.body);

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result,
    });
});

// ✅ Delete User (Soft Delete)
const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.deleteUser(req.user?._id as string);

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result,
    });
});

export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};