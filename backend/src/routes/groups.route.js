import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    createGroup,
    getUserGroups,
    addMember,
    getGroupMessages,
} from "../controllers/group.controller.js";

const router = express.Router();

router.post("/", protectRoute, createGroup);
router.get("/", protectRoute, getUserGroups);
router.post("/:groupId/add", protectRoute, addMember);
router.get("/:groupId/messages", protectRoute, getGroupMessages);

export default router;
