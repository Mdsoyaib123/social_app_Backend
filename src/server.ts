import mongoose from "mongoose";
import http from "http";
import app from "./app";
import 'dotenv/config';
import { configs } from "./configs";


async function main() {
    try {
        await mongoose.connect(configs.db_url!);
        console.log("MongoDB connected");


        app.listen(configs.port, () => {
            console.log(`🚀 Server running on port ${configs.port}`);
        });
    } catch (err) {
        console.log("❌ Error:", err);
    }
}

main();

