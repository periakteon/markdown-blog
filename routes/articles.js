const express = require("express");
const Article = require("../models/articleModel");
const mongoose = require("mongoose");
const router = express.Router();

// "/articles" istekleri, yani bir nevi articles'ın anasayfası
router.get("/new", (req, res) => {
  res.render("articles/new");
});

router.get("/:id", async (req, res) => {
  //eğer girilen parametre mevcut değilse veya veritabanında yoksa
  if (!req.params.id || !mongoose.isValidObjectId(req.params.id)) {
    res.redirect("/");
    console.log("Hatalı id");
    return;
  }
  try {
    const article = await Article.findById(req.params.id);

    // show.ejs'te kullanmak üzere "article" değişkenini ikinci parametre olarak girip show.ejs'e gönderiyoruz
    res.render("articles/show", { article: article });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// yeni yazı eklemek için ".../articles" adresine gelen POST isteklerini yönetiyoruz
router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    res.redirect(`/articles/${article.id}`);
    console.log(`Yazı ekleme başarılı. ${article.id}'ye yönlendiriliyorsunuz.`);
  } catch (err) {
    console.log(err);
    res.render("articles/new");
  }
});

module.exports = router;
