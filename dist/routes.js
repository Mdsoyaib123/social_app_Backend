"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("./module/user/user.route");
const auth_route_1 = __importDefault(require("./module/auth/auth.route"));
const post_route_1 = __importDefault(require("./module/post/post.route"));
const comment_route_1 = require("./module/comment/comment.route");
const like_route_1 = require("./module/like/like.route");
const appRouter = (0, express_1.Router)();
const moduleRoutes = [
    { path: "/users", route: user_route_1.UserRoutes },
    { path: "/auth", route: auth_route_1.default },
    { path: "/post", route: post_route_1.default },
    { path: "/comment", route: comment_route_1.CommentRoutes },
    { path: "/like", route: like_route_1.LikeRoutes },
];
moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));
exports.default = appRouter;
