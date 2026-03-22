import Order from "../models/Order.js";
import sendOrderSMS from "../services/sendOrderSMS.js";


// CREATE ORDER
export const createOrder = async (req, res) => {
  try {

    console.log("📦 Incoming order:", req.body);

    const order = new Order(req.body);
    const savedOrder = await order.save();

    console.log("✅ Order saved:", savedOrder.orderRef);

    // SEND SMS (do not break order if SMS fails)
    try {
      await sendOrderSMS(savedOrder);
      console.log("📩 SMS sent successfully");
    } catch (smsError) {
      console.log("❌ SMS sending failed:", smsError.message);
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder
    });

  } catch (err) {

    console.log("❌ Order creation error:", err);

    res.status(500).json({
      success: false,
      message: "Order creation failed"
    });

  }
};



// GET ALL ORDERS (ADMIN)
export const getOrders = async (req, res) => {
  try {

    const orders = await Order.find().sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    console.log("❌ Get orders error:", err);

    res.status(500).json({
      message: "Failed to fetch orders"
    });

  }
};



// TRACK ORDER
export const trackOrder = async (req, res) => {
  try {

    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json({
      orderId: order._id,
      status: order.status
    });

  } catch (err) {

    console.log("❌ Track order error:", err);

    res.status(500).json({
      message: "Tracking failed"
    });

  }
};



// GET USER ORDERS
export const getMyOrders = async (req, res) => {
  try {

    const { username } = req.params;

    const orders = await Order.find({ username })
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    console.log("❌ Get user orders error:", err);

    res.status(500).json({
      message: "Failed to fetch user orders"
    });

  }
};



// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.json({
      success: true,
      message: "Order status updated",
      order: updated
    });

  } catch (err) {

    console.log("❌ Update status error:", err);

    res.status(500).json({
      message: "Status update failed"
    });

  }
};