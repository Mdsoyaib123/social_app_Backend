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
exports.auth_services = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const app_error_1 = require("../../utils/app_error");
const JWT_1 = require("../../utils/JWT");
const configs_1 = require("../../configs");
const user_schema_1 = require("../user/user.schema");
// login user
const login_user_from_db = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("payload from service ", payload);
    const isExistAccount = yield user_schema_1.UserModel.findOne({
        email: payload === null || payload === void 0 ? void 0 : payload.email,
    }).select("+password");
    if (!isExistAccount) {
        throw new app_error_1.AppError("User not found", 404);
    }
    const isPasswordMatch = yield bcryptjs_1.default.compare(payload.password, isExistAccount === null || isExistAccount === void 0 ? void 0 : isExistAccount.password);
    if (!isPasswordMatch) {
        throw new app_error_1.AppError("Invalid password", 401);
    }
    const accessToken = JWT_1.jwtHelpers.generateToken({
        _id: isExistAccount._id,
        email: isExistAccount.email,
    }, configs_1.configs.jwt.accessToken_secret, configs_1.configs.jwt.accessToken_expires);
    const refreshToken = JWT_1.jwtHelpers.generateToken({
        _id: isExistAccount._id,
        email: isExistAccount.email,
    }, configs_1.configs.jwt.refreshToken_secret, configs_1.configs.jwt.refreshToken_expires);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        userId: isExistAccount._id,
    };
});
const refresh_token_from_db = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = JWT_1.jwtHelpers.verifyToken(token, configs_1.configs.jwt.refreshToken_secret);
    }
    catch (err) {
        throw new Error("You are not authorized!");
    }
    const userData = yield user_schema_1.UserModel.findOne({
        email: decodedData.email,
    });
    if (!userData) {
        throw new app_error_1.AppError("User not found", 404);
    }
    const accessToken = JWT_1.jwtHelpers.generateToken({ _id: userData === null || userData === void 0 ? void 0 : userData._id, email: userData === null || userData === void 0 ? void 0 : userData.email }, configs_1.configs === null || configs_1.configs === void 0 ? void 0 : configs_1.configs.jwt.accessToken_secret, configs_1.configs.jwt.accessToken_expires);
    return { accessToken };
});
exports.auth_services = {
    login_user_from_db,
    refresh_token_from_db,
};
