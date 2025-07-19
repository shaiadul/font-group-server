const Font = require("../models/Font");
const path = require("path");

exports.uploadFont = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No font file uploaded." });
    }
    const font = new Font({
      name: req.file.originalname,
      filePath: `/uploads/${req.file.filename}`,
    });
    await font.save();
    res.status(201).json(font);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFonts = async (req, res) => {
  try {
    const fonts = await Font.find();
    res.json(fonts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
