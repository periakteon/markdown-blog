// .env oluşturmayı unutma (PORT:3000)

const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/dbConnection");
const PORT = process.env.PORT || 3001;
const Article = require("./models/articleModel");
const articlesRouter = require("./routes/articlesRouter");
const methodOverride = require("method-override");
const app = express();

dotenv.config();

app.set("view engine", "ejs");

const startApp = async () => {
  try {
    await connectDb();
    app.listen(process.env.PORT, () => {
      console.log(`Uygulama ${PORT} portunda çalışıyor.`);
    });
  } catch (err) {
    console.log("Uygulama başlatılırken bir hata oluştu:", err);
  }
};

startApp();

app.use(express.urlencoded({ extended: false }));

// The method-override middleware lets us use HTTP verbs like PUT and DELETE with clients that don’t support it.
app.use(methodOverride("_method"));

// "/" adresine istek geldiğinde views klasörünün içerisindeki "index"i render et
app.get("/", async (req, res) => {
  //veritabanından tüm yazıları bulup, en yeni olanlar en üstte görünecek şekilde alıyoruz
  const articles = await Article.find().sort({ createdAt: "descending" });

  // anasayfamızı articles view'inin içerisindeki index.ejs olarak belirledik
  // tüm yazıları almak için forEach kullanacağız, bu nedenle yukarıdaki articles dizisini "articles" olarak aktarıyoruz: ejs ile kullanmak için
  res.render("articles/index", { articles: articles });
});

// "/articles"a gelen her şeyi articles.js router'ı üzerinden kontrol edeceğiz
// yani diyoruz ki: "/articles"a gelen her şeyi al, sonrasında işi articlesRouter'a bırak
app.use("/articles", articlesRouter);