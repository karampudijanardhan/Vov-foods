import express from "express";
import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
  trackOrder
} from "../controllers/orderController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| ORDER ROUTES
|--------------------------------------------------------------------------
*/

// Create new order
router.post("/create", createOrder);

// Get all orders (admin)
router.get("/", getOrders);

// Get orders by username
router.get("/user/:username", getMyOrders);

// Track order by ID
router.get("/track/:orderId", trackOrder);

// Update order status (admin)
router.put("/status/:id", updateOrderStatus);

export default router;