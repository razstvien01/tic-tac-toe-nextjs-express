const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const gameSessionRoutes = require("./routes/gameSessionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/", gameSessionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
