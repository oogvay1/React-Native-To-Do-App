import express from "express"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";

dotenv.config();

const chat = express();

chat.use(express.json());

chat.use("/api/auth", authRoutes)

const PORT = process.env.PORT;

chat.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    connectDB();
});