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
exports.createUploader = void 0;
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
const createUploader = (folder) => {
    const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
        cloudinary: cloudinary_1.v2,
        params: (req, file) => __awaiter(void 0, void 0, void 0, function* () {
            const isPdf = file.mimetype === "application/pdf";
            // Clean file name: remove extension, trim spaces, replace spaces with _
            const fileName = file.originalname
                .replace(/\.[^/.]+$/, "")
                .trim()
                .replace(/\s+/g, "_");
            return {
                folder,
                resource_type: isPdf ? "raw" : "image",
                public_id: fileName,
                format: isPdf ? "pdf" : undefined, // <-- this is the key
                allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
            };
        }),
    });
    return (0, multer_1.default)({ storage });
};
exports.createUploader = createUploader;
