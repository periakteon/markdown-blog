const express = require("express");
const router = express.Router();

// "/articles" istekleri, yani bir nevi articles'ın anasayfası
router.get("/", (req, res) => {
  res.send("Articles");
});

module.exports = router;
