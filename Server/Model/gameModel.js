import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    id: { type: String, immutable: true, unique: true, index: true },
    name: { type: String, require: true, trim: true },
    img: { type: String, default: "" },
    releaseDate: { type: String, require: true },
    description: { type: String, require: true, trim: true },
});

const Game = mongoose.model("Game", gameSchema, "games");

export default Game;
