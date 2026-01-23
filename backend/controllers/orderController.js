import Order from "../models/Order.js";
import { sendTelegram } from "../utils/sendTelegram.js";

// 🆕 helper to generate orderRef if not sent
const generateOrderRef = () => {
  return "VOV" + Date.now();
};

// Place order
export const placeOrder = async (req, res) => {
  try {
    const data = req.body;

    // 🆕 auto-generate orderRef if missing
    if (!data.orderRef) {
      data.orderRef = generateOrderRef();
    }

    const order = new Order(data);
    await order.save();

    const message = `
🛒 New Order Received
Order ID: ${order.orderRef}
Name: ${order.name}
Total: ₹${order.totalAmount}
Status: ${order.status}
`;

    await sendTelegram(message);

    res.status(201).json({ success: true, order });

  } catch (err) {
    console.error("❌ ORDER ERROR:", err.message);
    res.status(500).json({ success: false, message: "Order failed" });
  }
};

// Update status (admin)
export const updateOrderStatus = async (req, res) => {
  const { orderRef, status } = req.body;

  try {
    const order = await Order.findOne({ orderRef });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    const message = `
📦 Order Update
Order ID: ${order.orderRef}
New Status: ${order.status}
`;

    await sendTelegram(message);

    res.json({ success: true, order });

  } catch (err) {
    console.error("❌ STATUS ERROR:", err.message);
    res.status(500).json({ success: false, message: "Status update failed" });
  }
};

// Track order (user)
export const trackOrder = async (req, res) => {
  const { orderRef } = req.params;

  try {
    const order = await Order.findOne({ orderRef });

    if (!order) {
      return res.status(404).json({ success: false, message: "Invalid Order ID" });
    }

    res.json({
      success: true,
      orderRef: order.orderRef,
      status: order.status,
      updatedAt: order.updatedAt || order.createdAt
    });

  } catch (err) {
    console.error("❌ TRACK ERROR:", err.message);
    res.status(500).json({ success: false });
  }
};

// 🆕 Get orders of logged-in user (Order History)
export const getMyOrders = async (req, res) => {
  const { username } = req.params;

  try {
    const orders = await Order.find({ username }).sort({ createdAt: -1 });

    res.json({ success: true, orders });

  } catch (err) {
    console.error("❌ MY ORDERS ERROR:", err.message);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};
