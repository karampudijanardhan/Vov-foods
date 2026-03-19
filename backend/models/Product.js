import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  image: String,

  weightOptions: [String],

  prices: {
    "250g": Number,
    "500g": Number,
    "1kg": Number
  },

  spiceLevel: String,
  shelfLife: String,
  stock: Number,
  rating: Number,

  badges: [String],

  description: String,

  ingredients: [String]
});

const Product = mongoose.model("Product", productSchema);

export default Product;