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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
// ✅ Create User
const createUser = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.createUser(req.body);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result,
    });
}));
// ✅ Get All Users
const getAllUsers = (0, catch_async_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getAllUsers();
    res.status(200).json({
        success: true,
        data: result,
    });
}));
// ✅ Get Single User
const getSingleUser = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("req.user from controller ", req === null || req === void 0 ? void 0 : req.user);
    const result = yield user_service_1.UserService.getSingleUser((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
    res.status(200).json({
        success: true,
        data: result,
    });
}));
// ✅ Update User
const updateUser = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const result = yield user_service_1.UserService.updateUser((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, req.body);
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result,
    });
}));
// ✅ Delete User (Soft Delete)
const deleteUser = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const result = yield user_service_1.UserService.deleteUser((_c = req.user) === null || _c === void 0 ? void 0 : _c._id);
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result,
    });
}));
exports.UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
