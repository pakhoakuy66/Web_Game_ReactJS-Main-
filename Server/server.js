import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import {
    getAllGame,
    findGame,
    createGame,
    generateGameId,
    findCategory,
    updateGame,
    deleteGame,
} from "./Controllers/gameController.js";
import { registerUser, loginUser } from "./Controllers/userController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

mongoose
    .connect(MONGO_URI, {
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
app.get("/games/generate-id", generateGameId);
app.get("/games/filterCategory", findCategory);

app.post("/register/create", registerUser);
app.post("/login", loginUser);
app.post("/games/create", createGame);

app.put("/games/update/:id", updateGame);

app.delete("/games/delete/:id", deleteGame);

app.listen(port, () =>
    console.log(`Example app listening on port http://localhost:${port}`)
);
