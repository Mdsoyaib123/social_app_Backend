import { Router } from "express";
import { auth_controllers } from "./auth.controller";
import RequestValidator from "../../middlewares/request_validator";
import auth from "../../middlewares/auth";
import { auth_validation } from "./auth.validation";

const authRoute = Router();

authRoute.post(
  "/login",
  RequestValidator(auth_validation.login_validation),
  auth_controllers.login_user
);

authRoute.post("/refresh-token", auth_controllers.refresh_token);


export default authRoute;
