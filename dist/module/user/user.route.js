"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/createUser", user_controller_1.UserController.createUser);
router.get("/getAllUsers", user_controller_1.UserController.getAllUsers);
router.get("/getSingleUser", (0, auth_1.default)(), user_controller_1.UserController.getSingleUser);
router.patch("/updateUser", (0, auth_1.default)(), user_controller_1.UserController.updateUser);
router.delete("/deleteUser", (0, auth_1.default)(), user_controller_1.UserController.deleteUser);
exports.UserRoutes = router;
