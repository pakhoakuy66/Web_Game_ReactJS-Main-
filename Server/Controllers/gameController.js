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
