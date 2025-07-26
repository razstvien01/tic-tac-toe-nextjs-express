const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const gameSessionRoutes = require("./routes/gameSessionRoutes");
require("dotenv").config({ path: ".env.local" });

const app = express();

app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_BASE_URL,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.use("/", gameSessionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
