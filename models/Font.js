const mongoose = require("mongoose");

const FontSchema = new mongoose.Schema({
  name: { type: String, required: true },
  filePath: { type: String, required: true },
});

module.exports = mongoose.model("Font", FontSchema);
