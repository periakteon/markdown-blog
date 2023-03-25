const express = require("express");
const Article = require("../models/articleModel");
const router = express.Router();

// "/articles" istekleri, yani bir nevi articles'ın anasayfası
router.get("/new", (req, res) => {
  res.render("articles/new");
});

// yeni yazı eklemek için ".../articles" adresine gelen POST isteklerini yönetiyoruz
router.post("/", async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
  } catch (error) {}
});

module.exports = router;
