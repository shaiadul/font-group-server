const FontGroup = require("../models/FontGroup");

exports.createFontGroup = async (req, res) => {
  const { name, fontIds } = req.body;
  if (!fontIds || fontIds.length < 2) {
    return res.status(400).json({ error: "Select at least two fonts." });
  }
  try {
    const group = new FontGroup({ name, fontIds });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFontGroups = async (req, res) => {
  try {
    const groups = await FontGroup.find().populate("fontIds");
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFontGroup = async (req, res) => {
  const { name, fontIds } = req.body;
  if (!fontIds || fontIds.length < 2) {
    return res.status(400).json({ error: "At least two fonts required." });
  }
  try {
    const group = await FontGroup.findByIdAndUpdate(
      req.params.id,
      { name, fontIds },
      { new: true }
    );
    if (!group) return res.status(404).json({ error: "Font group not found." });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFontGroup = async (req, res) => {
  try {
    const deleted = await FontGroup.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Font group not found." });
    res.json({ message: "Deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};