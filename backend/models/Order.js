import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // 🔑 Your existing fields (UNCHANGED)
  orderRef: { type: String, required: true, unique: true },
  name: String,
  mobile: String,
  address: String,
  items: Array,
  totalAmount: Number,

  status: {
    type: String,
    enum: ["PLACED", "PACKING", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"],
    default: "PLACED"
  },

  createdAt: { type: Date, default: Date.now },

  // 🆕 ADDED FIELDS (for login + order history + tracking)
  username: { type: String },          // to link order with logged-in user
  email: { type: String },             // optional
  subtotal: { type: Number },          // cart subtotal
  deliveryCharge: { type: Number },    // delivery fee
});

export default mongoose.model("Order", orderSchema);
