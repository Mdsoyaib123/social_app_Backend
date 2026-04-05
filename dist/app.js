"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const global_error_handler_1 = __importDefault(require("./middlewares/global_error_handler"));
const routes_1 = __importDefault(require("./routes"));
const bodyParser = require("body-parser");
const app = (0, express_1.default)();
// middleware
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174",
        "*"
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
}));
app.use(bodyParser.json());
app.use(express_1.default.json({ limit: "100mb" }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/v1", routes_1.default);
// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Server is running successfully!",
    });
});
// global error handler
app.use(global_error_handler_1.default);
exports.default = app;
