const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
app.use(cors());
app.use(express.json());

const menuRoutes = require("./routes/menuRoutes");
const authRoutes = require("./routes/ authRoutes");

app.use("/api/menu", menuRoutes);
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.json("API Running... to nati");
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});