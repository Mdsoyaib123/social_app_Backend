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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_schema_1 = require("./user.schema");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_schema_1.UserModel.findOne({ email: payload.email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const user = yield user_schema_1.UserModel.create(payload);
    return user;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_schema_1.UserModel.find({ isDeleted: false });
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("id from service ", id);
    const user = yield user_schema_1.UserModel.findById(id);
    if (!user)
        throw new Error("User not found");
    return user;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload, rest = __rest(payload, ["email"]);
    const user = yield user_schema_1.UserModel.findByIdAndUpdate(id, rest, {
        new: true,
        runValidators: true,
    });
    if (!user)
        throw new Error("User not found");
    return user;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_schema_1.UserModel.findByIdAndDelete(id);
    if (!user)
        throw new Error("User not found");
    return user;
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
