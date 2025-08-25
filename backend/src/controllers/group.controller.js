import Group from "../models/group.model.js";
import Message from "../models/massage.model.js";

// ✅ Create new group
export const createGroup = async (req, res) => {
    try {
        const { name, description } = req.body;
        const adminId = req.user._id; // from auth middleware

        if (!name) {
            return res.status(400).json({ message: "Group name is required" });
        }

        const newGroup = new Group({
            name,
            description,
            members: [adminId], // creator is auto member
            admins: [adminId],
        });

        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (error) {
        console.error("Error in createGroup:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Get all groups user is in
export const getUserGroups = async (req, res) => {
    try {
        const userId = req.user._id;
        const groups = await Group.find({ members: userId });
        res.status(200).json(groups);
    } catch (error) {
        console.error("Error in getUserGroups:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Add member to group
export const addMember = async (req, res) => {
    try {
        const { groupId } = req.params;
        const { memberId } = req.body;

        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: "Group not found" });

        if (!group.members.includes(memberId)) {
            group.members.push(memberId);
            await group.save();
        }

        res.status(200).json(group);
    } catch (error) {
        console.error("Error in addMember:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Fetch messages in a group
export const getGroupMessages = async (req, res) => {
    try {
        const { groupId } = req.params;
        const messages = await Message.find({ group: groupId }).populate("sender", "fullName email");
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getGroupMessages:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};
