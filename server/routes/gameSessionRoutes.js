const express = require("express");
const GameSession = require("../models/GameSession");
const API_ROUTES = require("../constants/apiRoutes");

const router = express.Router();

router.post(API_ROUTES.SAVE_SESSION, async (req, res) => {
  console.log("POST /save-session → Saving new game session...");
  console.log("Request body:", req.body);
  try {
    const session = new GameSession(req.body);
    await session.save();
    console.log("Game session saved successfully with ID:", session._id);
    res.status(200).json({ message: "Session saved" });
  } catch (err) {
    console.error("Failed to save session:", err.message);
    res.status(500).json({ error: "Failed to save session" });
  }
});

router.get(API_ROUTES.GET_SESSIONS, async (req, res) => {
  console.log("GET /game-sessions → Fetching all sessions...");

  try {
    const sessions = await GameSession.find();
    console.log(`Fetched ${sessions.length} game sessions.`);
    res.status(200).json(sessions);
  } catch (err) {
    console.error("Failed to fetch sessions:", err.message);
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

module.exports = router;
