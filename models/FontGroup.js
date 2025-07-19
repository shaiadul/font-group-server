const mongoose = require("mongoose");

const FontGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fontIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Font", required: true }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FontGroup", FontGroupSchema);