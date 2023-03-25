const express = require("express");
const Article = require("../models/articleModel");
const router = express.Router();

// "/articles" istekleri, yani bir nevi articles'ın anasayfası
router.get("/new", (req, res) => {

  // bunu yapmamızın sebebi yalnızca şema oluşturup içeriğini boş bırakmak, aksi takdirde edit için kullandığımız pre-populate işlemini yapamıyorum
  const article = new Article();
  res.render("articles/new", { article: article });
});

router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/edit", {article: article});
});

router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });

  // eğer slug parametresi yoksa veya bu slug'a sahip bir yazı yoksa
  if (!req.params.slug || !article) {
    res.redirect("/");
    console.log("Hatalı slug.");
    return;
  }

  try {
    // eğer yazı varsa
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
    res.redirect(`/articles/${article.slug}`);
    console.log(
      `Yazı ekleme başarılı. ${article.slug}'ye yönlendiriliyorsunuz.`
    );
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.slug) {
      // Send a 400 Bad Request status code and the duplicate key error message to the client
      res.status(400).send({ error: "Aynı başlığa sahip başka bir yazı var." });
    } else {
      // For other errors, send a 500 Internal Server Error status code and the error message to the client
      res.status(500).send({ error: error.message });
    }
  }
});

// "delete" metodu kullanmak için method-override kullanmamız gerekiyor, bunu da index.ejs'te ayrıca belirtiyoruz
// şöyle: <form action="/articles/<%= article.id %>?_method=DELETE" method="POST"></form>
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
