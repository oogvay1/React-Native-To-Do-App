import Message from "../models/user.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { receiver, group, message } = req.body;
        const newMessage = await Message.create({
            sender: req.user._id,
            receiver,
            group,
            message
        });
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ message: "Error sending message" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chatId: req.params.chatId })
            .populate("sender", "fullName email profilePic");
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: "Error fetching messages" });
    }
};
