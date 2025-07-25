const mongoose = require("mongoose");

const roundSchema = new mongoose.Schema({
  winner: String,
  moves: [String],
});

const finalScoreSchema = new mongoose.Schema({
  player1Wins: Number,
  player2Wins: Number,
  draws: Number,
});

const gameSessionSchema = new mongoose.Schema({
  id: Number,
  player1Name: String,
  player2Name: String,
  startTime: Date,
  endTime: Date,
  rounds: [roundSchema],
  finalScore: finalScoreSchema,
});

module.exports = mongoose.model("GameSession", gameSessionSchema);
