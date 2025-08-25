import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import groupRoutes from "./routes/groups.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"

dotenv.config();

const chat = express();

chat.use(express.json());
chat.use(cookieParser());

chat.use("/auth", authRoutes);
chat.use("/messages", messageRoutes);
chat.use("/groups", groupRoutes);

const PORT = process.env.PORT;

chat.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    connectDB();
});