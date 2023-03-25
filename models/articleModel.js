const mongoose = require("mongoose");
//markdown için
const { marked } = require("marked");
// URL'leri id ile değil başlığa göre getirmek için (xxx.com/articles/1285asdua5 yerine xxx.com/articles/yazi-basligi)
const slugify = require("slugify");
const createDomPurifier = require("dompurify");

// paketin tamamını değil, yalnızca "JSDOM"u istediğimiz için bracket içine aldık
const { JSDOM } = require("jsdom");
const dompurify = createDomPurifier(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    // "default" özelliği fonksiyon aldığı için böyle yaptık
    // ama "() => Date.now()" yerine direkt "default: Date.now" da yapabilirdik (parantez olmadan)
    default: () => Date.now(),
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

// herhangi bir ekleme, düzeltme, silme vb. gibi durumlardan önce (pre) çalışacak ara fonksiyon ekliyoruz (middleware)
articleSchema.pre("validate", function (next) {
  // başlık var mı diye kontrol ediyoruz
  if (this.title) {
    // başlık varsa, başlık küçük harfle slug olsun ve boşluk vb. görürsen kafana göre işaret et (-) gibi (strict bu işe yarıyor)
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
  }

  // middleware işleminin tamamlandığını, kalan işlemlere devam etmesi gerektiğini söylüyoruz
  next();
});

module.exports = mongoose.model("Article", articleSchema);
