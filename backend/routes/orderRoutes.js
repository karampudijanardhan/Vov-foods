import express from "express";

import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
  trackOrder,
  verifyPayment
} from "../controllers/orderController.js";

const router = express.Router();

// CREATE ORDER
router.post("/", createOrder);

// GET ALL ORDERS
router.get("/", getOrders);

// USER ORDERS
router.get("/my/:username", getMyOrders);

// TRACK ORDER
router.get("/track/:orderId", trackOrder);

// UPDATE STATUS
router.put("/status/:id", updateOrderStatus);

// NEW ROUTE (PAYMENT VERIFY)
router.put("/verify/:id", verifyPayment);

export default router;