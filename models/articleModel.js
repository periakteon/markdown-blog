const mongoose = require("mongoose");

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
});

module.exports = mongoose.model("Article", articleSchema);
