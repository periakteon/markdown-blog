// .env oluşturmayı unutma (PORT:3000)

const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const connectDb = require("./config/dbConnection");
const PORT = process.env.PORT || 3001;
const articleRouter = require("./routes/articles");
const app = express();

// veritabanı bağlantısı için asenkron fonksiyon oluşturuyoruz.
// önce veritabanı bağlantısının sağlanması için connectDb() fonksiyonunu await ediyoruz
// await edilen fonksiyon çözüldüğünde, yani Promise resolve olduğunda port dinlemeyi başlatıyoruz
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

/* 
EJS modülü template dosyaları görebilmek için varsayılan olarak views klasörünün içerisindeki
.ejs uzantılı dosyalara bakar.

view engine ile ejs kodlarını HTML'e çeviririz, daha dinamik sayfalar için
*/
app.set("view engine", "ejs");

// "/articles"a gelen her şeyi articles.js router'ı üzerinden kontrol edeceğiz
// yani diyoruz ki: "/articles"a gelen her şeyi al, sonrasında işi articleRouter'a bırak
app.use("/articles", articleRouter);

/*

the difference is express.json() is a body parser for post request except html post form and express.urlencoded({extended: false}) is a body parser for html post form.

express.json() is a built express middleware that convert request body to JSON.
express.urlencoded() just like express.json() converts request body to JSON, it also carries out some other functionalities like: converting form-data to JSON etc.
*/

app.use(express.urlencoded({ extended: false }));

// "/" adresine istek geldiğinde views klasörünün içerisindeki "index"i render et
app.get("/", (req, res) => {
  // anasayfada çıkacak olan yazıları nesne olarak engine'e göndermek için
  const articles = [
    {
      title: "Test Article",
      createdAt: new Date(),
      description: "test description",
    },
    {
      title: "Test Article 2",
      createdAt: new Date(),
      description: "test description 2",
    },
  ];
  // anasayfamızı articles view'inin içerisindeki index.ejs olarak belirledik
  res.render("articles/index", { articles: articles });
});
