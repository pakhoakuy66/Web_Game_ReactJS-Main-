import bcrypt from "bcryptjs";
import express from "express";
import User from "../Model/userModel.js";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email này đã tồn tại" });
        }

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashPass,
        });

        await newUser.save();

        res.status(201).json({ message: "Đăng ký thành công" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User không tồn tại" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(401)
                .json({ message: "Mật khẩu bạn nhập không đúng" });
        }

        res.status(200).json({
            message: "Đăng nhập thành công",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};
