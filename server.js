// .env oluşturmayı unutma (PORT:3000)

const express = require("express");
const dotenv = require("dotenv").config();
const articleRouter = require("./routes/articles");
const app = express();

/* 
EJS modülü template dosyaları görebilmek için varsayılan olarak views klasörünün içerisindeki
.ejs uzantılı dosyalara bakar.

view engine ile ejs kodlarını HTML'e çeviririz, daha dinamik sayfalar için
*/
app.set("view engine", "ejs");

// "/articles"a gelen her şeyi articles.js router'ı üzerinden kontrol edeceğiz
// yani diyoruz ki: "/articles"a gelen her şeyi al, sonrasında işi articleRouter'a bırak
app.use("/articles", articleRouter);

app.listen(process.env.PORT, () => {
  console.log(`Uygulama ${process.env.PORT} portunda çalışıyor.`);
});

// "/" adresine istek geldiğinde views klasörünün içerisindeki "index"i render et
app.get("/", (req, res) => {
  // "index.ejs" içerisindeki "<%= text %>" nesnesini bize gönderir
  res.render("index", { text: "engine denemesi" });
});
