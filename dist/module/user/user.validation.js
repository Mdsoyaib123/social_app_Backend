"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_validations = void 0;
const zod_1 = require("zod");
const create_user = zod_1.z
    .object({
    fristName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    comfirmPassword: zod_1.z.string().min(6, "Confirm Password must be at least 6 characters long"),
});
exports.user_validations = {
    create_user,
};
