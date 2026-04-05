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
exports.LikeController = void 0;
const catch_async_1 = __importDefault(require("../../utils/catch_async"));
const like_service_1 = require("./like.service");
const manage_response_1 = __importDefault(require("../../utils/manage_response"));
// TOGGLE LIKE
const toggleLike = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield like_service_1.LikeService.toggleLike({
        targetId: req.body.targetId,
        targetType: req.body.targetType,
    }, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
    return (0, manage_response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: result.message,
        data: result,
    });
}));
// GET LIKE COUNT
const getLikeCount = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { targetId, targetType } = req.query;
    const result = yield like_service_1.LikeService.getLikeCount(targetId, targetType);
    return (0, manage_response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Like count fetched",
        data: result,
    });
}));
// GET USERS WHO LIKED
const getLikes = (0, catch_async_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { targetId, targetType } = req.query;
    const result = yield like_service_1.LikeService.getLikes(targetId, targetType);
    return (0, manage_response_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Likes fetched",
        data: result,
    });
}));
exports.LikeController = {
    toggleLike,
    getLikeCount,
    getLikes,
};
