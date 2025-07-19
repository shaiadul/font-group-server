require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

const fontRoutes = require("./routes/fontRoutes");
const fontGroupRoutes = require("./routes/fontGroupRoutes");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });


app.use("/api/fonts", fontRoutes);
app.use("/api/font-groups", fontGroupRoutes);


app.use((req, res) => {
  res.status(404).json({ error: "API endpoint not found." });
});


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));