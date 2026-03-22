import express from "express";
import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
  trackOrder
} from "../controllers/orderController.js";

const router = express.Router();

// Create order
router.post("/", createOrder);

// Get all orders
router.get("/", getOrders);

// Get user orders
router.get("/my/:username", getMyOrders);

// Track order
router.get("/track/:orderId", trackOrder);

// Update order status
router.put("/status/:id", updateOrderStatus);

export default router;