import express from "express";
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getMyOrders
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/",createOrder);

router.get("/",getOrders);
router.get("/my/:username", getMyOrders);

router.put("/status/:id",updateOrderStatus);

export default router;