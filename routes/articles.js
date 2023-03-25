const express = require("express");
const router = express.Router();

// "/articles" istekleri, yani bir nevi articles'ın anasayfası
router.get("/new", (req, res) => {
  res.render("articles/new");
});

// yeni yazı eklemek için ".../articles" adresine gelen POST isteklerini yönetiyoruz
router.post("/", (req, res) => {});

module.exports = router;
