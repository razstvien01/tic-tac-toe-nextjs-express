const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/game-sessions", (req, res) => {
  const gameSessionDtos = [
    {
      id: 1,
      player1Name: "You",
      player2Name: "AI",
      startTime: "2025-07-21T12:30:00Z",
      endTime: "2025-07-21T12:45:00Z",
      rounds: [{}, {}, {}],
      finalScore: {
        player1Wins: 1,
        player2Wins: 1,
        draws: 1,
      },
    },
    {
      id: 2,
      player1Name: "Charlie",
      player2Name: "Dana",
      startTime: "2025-07-22T14:00:00Z",
      endTime: "2025-07-22T14:15:00Z",
      rounds: [{}],
      finalScore: {
        player1Wins: 0,
        player2Wins: 1,
        draws: 0,
      },
    },
  ];

  res.status(200).json(gameSessionDtos);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
