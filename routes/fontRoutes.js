const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { uploadFont, getFonts } = require("../controllers/fontController");

// Multer setup for file upload including file validation - only .ttf
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const isTTF = file.mimetype === "font/ttf" || file.originalname.endsWith(".ttf");
  if (isTTF) cb(null, true);
  else cb(new Error("Only .ttf fonts are allowed"), false);
};

const upload = multer({ storage, fileFilter });

router.post("/", upload.single("font"), uploadFont);
router.get("/", getFonts);

module.exports = router;