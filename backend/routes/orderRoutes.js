import express from "express";
import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

// Create order
router.post("/", createOrder);

// Get all orders
router.get("/", getOrders);

// Get user orders
router.get("/my/:username", getMyOrders);

// Update order status
router.put("/status/:id", updateOrderStatus);

export default router;