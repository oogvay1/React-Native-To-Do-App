import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { sendMessage, getMessages } from "../controllers/massage.controller.js";

const router = express.Router();

router.post("/", protectRoute, sendMessage);
router.get("/:chatId", protectRoute, getMessages);

export default router;
