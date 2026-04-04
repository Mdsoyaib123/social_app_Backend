import { Router } from "express";
import { UserRoutes } from "./module/user/user.route";
import authRoute from "./module/auth/auth.route";
import PostRoutes from "./module/post/post.route";

const appRouter = Router();


const moduleRoutes = [
  { path: "/users", route: UserRoutes },
  { path: "/auth", route: authRoute },
  { path: "/post", route: PostRoutes },

];

moduleRoutes.forEach((route) => appRouter.use(route.path, route.route));
export default appRouter;
