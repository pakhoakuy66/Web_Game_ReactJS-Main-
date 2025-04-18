import express from "express";
import Game from "../Model/gameModel.js";

export const getAllGame = async (req, res) => {
    try {
        const { page = 1, limit = 8 } = req.query;
        const games = await Game.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(games);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu", error });
    }
};

export const findGame = async (req, res) => {
    const { search } = req.query;

    try {
        let query = {};
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        const games = await Game.find(query);
        res.json(games);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi tìm game",
            error: error.message,
        });
    }
};

export const sortGame = async (req, res) => {
    const { sortOrder } = req.query;

    try {
        let sort = {};

        if (sortOrder === "asc") {
            sort.name = 1;
        } else if (sortOrder === "desc") {
            sort.name = -1;
        }

        const games = await Game.find().sort(sort);
        res.json(games);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi sắp xếp game",
            error: error.message,
        });
    }
};

export const generateGameId = async (req, res) => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({ message: "Chưa chọn thể loại game" });
        }

        const allGames = await Game.find();

        let maxNumber = 0;
        allGames.forEach((game) => {
            const match = game.id?.match(/GAME[A-Z]{2}(\d{4})/);
            if (match) {
                const number = parseInt(match[1]);
                if (number > maxNumber) {
                    maxNumber = number;
                }
            }
        });

        const nextNumber = (maxNumber + 1).toString().padStart(4, "0");
        const newId = `GAME${category}${nextNumber}`;

        res.json({ id: newId });
    } catch (error) {
        console.error("Lỗi khi tạo ID", error);
        res.status(500).json({ message: "Lỗi khi tạo ID", error });
    }
};

export const createGame = async (req, res) => {
    try {
        const { id, name, releaseDate, description, img, category } = req.body;

        if (!id || !category) {
            return res.status(400).json({ message: "Thiếu ID hoặc category" });
        }

        const newGame = new Game({
            id,
            name,
            releaseDate,
            description,
            img,
            category,
        });

        await newGame.save();

        res.status(201).json({ message: "Game được tạo", game: newGame });
    } catch (error) {
        console.error("Lỗi khi tạo game", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const findCategory = async (req, res) => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({ message: "Chưa chọn thể loại game" });
        }

        const games = await Game.find({
            id: { $regex: `GAME${category}` },
        });

        res.json(games);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lọc thể loại game", error });
    }
};

export const updateGame = async (req, res) => {
    try {
        const { id, name, releaseDate, description, img, category } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Game này không tồn tại" });
        }
    } catch (error) {}
};
