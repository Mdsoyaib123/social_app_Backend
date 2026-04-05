import express from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/register", UserController.createUser);
router.get("/getAllUsers", UserController.getAllUsers);
router.get("/getSingleUser", auth(), UserController.getSingleUser);
router.patch("/updateUser", auth(), UserController.updateUser);
router.delete("/deleteUser", auth(), UserController.deleteUser);

export const UserRoutes = router;