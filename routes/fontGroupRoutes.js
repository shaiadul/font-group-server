const express = require("express");
const router = express.Router();
const {
  createFontGroup,
  getFontGroups,
  updateFontGroup,
  deleteFontGroup,
} = require("../controllers/fontGroupController");

router.post("/", createFontGroup);
router.get("/", getFontGroups);
router.put("/:id", updateFontGroup);
router.delete("/:id", deleteFontGroup);

module.exports = router;
