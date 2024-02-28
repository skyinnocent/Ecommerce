const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discounts: {},
  seller: {
    type: mongoose.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  variants: {},
  images: [],
  category: {
    type: String,
    enum: [
      "DBZ",
      "Naruto",
      "One-Piece",
      "AOT",
      "Demon-Slayer",
      "Jujutsu-Kaisen",
      "NA",
    ],
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
