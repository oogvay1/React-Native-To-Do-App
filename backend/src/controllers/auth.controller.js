import bcrypt from "bcryptjs"
import User from "../models/user.model.js"

export const signup = async (req, res) => {

    const { email, fullName, password } = req.body;

    try {
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const user = await User.findOne({ email });

        if (user) res.status(400).json({ message: "email already exists" });

        const salt = new bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {

        } else {
            res.status(400).json({message: "invalid user data"});
        }

    } catch (error) {

    }
}

export const login = (req, res) => {
    res.send("login route")
}

export const logout = (req, res) => {
    res.send("logout route")
}