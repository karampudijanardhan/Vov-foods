import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  orderRef: String,

  username: String,

  name: String,

  phone: String,   // ⭐ THIS IS MISSING

  address: String,

  items: [
    {
      productId: String,
      name: String,
      image: String,
      qty: Number,
      weight: String,
      price: Number
    }
  ],

  totalAmount: Number,

  status: {
    type: String,
    default: "PLACED"
  }

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);