import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getMyOrders
} from "../controllers/orderController.js";

const router = express.Router();

// Create order (will also send SMS)
router.post("/", createOrder);

// Get all orders (admin)
router.get("/", getOrders);

// Get orders for logged user
router.get("/my/:username", getMyOrders);

// Update order status
router.put("/status/:id", updateOrderStatus);

export default router;