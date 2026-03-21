import express from "express";
import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = express.Router();

/*
------------------------------------
ORDER ROUTES
------------------------------------
*/

// Create new order
router.post("/", createOrder);

// Get all orders (Admin)
router.get("/", getOrders);

// Get orders by username (User orders)
router.get("/my/:username", getMyOrders);

// Update order status (Admin)
router.put("/status/:id", updateOrderStatus);

export default router;