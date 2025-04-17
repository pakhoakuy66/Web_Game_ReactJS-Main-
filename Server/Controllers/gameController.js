import express from "express";
import Game from "../Model/gameModel.js";

export const getAllGame = async (req, res) => {
    try {
        const games = await Game.find();
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
        } else if (sort === "desc") {
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

export const createGame = async (req, res) => {
    try {
        const { name, releaseDate, description, img, category } = req.body;

        if (!category) {
            return res.status(400).json({ message: "Chưa chọn thể loại game" });
        }

        const regex = new RegExp(`^GAME${category}`);
        const games = await Game.find({ id: regex }).sort({ id: -1 });

        let newId;

        if (games.length === 0) {
            newId = `GAME${category}0001`;
        } else {
            const lastGame = games[0];
            const lastNumber = parseInt(lastGame.id.slice(7));
            const nextNumber = (lastNumber + 1).toString().padStart(4, "0");
            newId = `GAME${category}${nextNumber}`;
        }

        const newGame = new Game({
            id: newId,
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
