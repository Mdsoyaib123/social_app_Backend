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
const app_error_1 = require("../utils/app_error");
const configs_1 = require("../configs");
const JWT_1 = require("../utils/JWT");
const user_schema_1 = require("../module/user/user.schema");
const auth = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            // console.log("token from auth middleware ", token);
            if (!token) {
                throw new app_error_1.AppError("You are not authorize!!", 401);
            }
            const verifiedUser = JWT_1.jwtHelpers.verifyToken(token, configs_1.configs.jwt.accessToken_secret);
            // check user
            const isUserExist = yield user_schema_1.UserModel.findOne({
                email: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.email,
            }).lean();
            if (!isUserExist) {
                throw new app_error_1.AppError("user not found !", 404);
            }
            req.user = verifiedUser;
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = auth;
