import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import {
    getAllGame,
    findGame,
    sortGame,
} from "./Controllers/gameController.js";

dotenv.config();

const app = express();
const port = 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        tls: true,
    })
    .then(() => {
        console.log("Connected to MongoDB Atlas");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB Atlas:", error.message);
        console.error("Full error:", error);
    });

app.get("/", getAllGame);
app.get("/games", getAllGame);
app.get("/games/search_Game", findGame);
app.get("/games/sort_Game", sortGame);

// app.post("/games/create", (req, res) => {
//     const { name, releaseDate, description, img } = req.body;

//     if (!name || !releaseDate || !description || !img) {
//         return res
//             .status(400)
//             .json({ message: "Vui lòng nhập đầy đủ thông tin!" });
//     }

//     const lastGame = gameData[gameData.length - 1];
//     const lastIdNumber = parseInt(lastGame.id.replace("GAME", ""));
//     const newId = `GAME${String(lastIdNumber + 1).padStart(3, "0")}`;

//     const newGame = { id: newId, name, releaseDate, description, img };
//     gameData.push(newGame);

//     res.status(201).json({
//         message: "Game đã được thêm thành công!",
//         game: newGame,
//     });
// });

// app.put("/games/update/:id", (req, res) => {
//     const { id } = req.params;
//     const { name, releaseDate, description, img } = req.body;

//     const gameIndex = gameData.findIndex((g) => g.id === id);
//     if (gameIndex === -1) {
//         return res.status(404).json({ message: "Không tìm thấy game!" });
//     }

//     gameData[gameIndex] = {
//         ...gameData[gameIndex],
//         name: name || gameData[gameIndex].name,
//         releaseDate: releaseDate || gameData[gameIndex].releaseDate,
//         description: description || gameData[gameIndex].description,
//         img: img || gameData[gameIndex].img,
//     };

//     res.json({
//         message: `Game ${name} đã được cập nhật!`,
//         game: gameData[gameIndex],
//     });
// });

// app.delete("/games/delete/:id", (req, res) => {
//     const { id } = req.params;
//     const gameIndex = gameData.findIndex((g) => g.id === id);

//     if (gameIndex === -1) {
//         return res.status(404).json({ message: "Game không tồn tai!" });
//     }

//     gameData.splice(gameIndex, 1);
//     return res.json({ message: "Game đã được xóa thành công!" });
// });

app.listen(port, () =>
    console.log(`Example app listening on port http://localhost:${port}`)
);
