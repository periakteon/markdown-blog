const express = require("express");
const Article = require("../models/articleModel");
const router = express.Router();

// "/articles" istekleri, yani bir nevi articles'ın anasayfası
router.get("/new", (req, res) => {
  res.render("articles/new");
});

// yeni yazı eklemek için ".../articles" adresine gelen POST isteklerini yönetiyoruz
router.post("/", (req, res) => {
  const article = new Article({});
});

module.exports = router;
