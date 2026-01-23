import express from "express";
import {
  placeOrder,
  updateOrderStatus,
  trackOrder,
  getMyOrders      // 🆕 added
} from "../controllers/orderController.js";

const router = express.Router();

// 🛒 Place new order
router.post("/", placeOrder);

// 📦 Update order status (admin)
router.put("/status", updateOrderStatus);

// 🔍 Track order (user)
router.get("/track/:orderRef", trackOrder);

// 🆕 Get logged-in user's orders (Order History)
router.get("/my/:username", getMyOrders);

export default router;
