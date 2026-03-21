import Order from "../models/Order.js";
import sendOrderSMS from "../services/sendOrderSMS.js";

// CREATE ORDER
export const createOrder = async (req, res) => {

  try {

    const order = new Order(req.body);
    const saved = await order.save();

    console.log("Order saved:", saved.orderRef);

    try {
      await sendOrderSMS(saved);
    } catch (smsError) {
      console.log("SMS failed:", smsError.message);
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: saved
    });

  } catch (err) {

    console.log("Order creation error:", err);

    res.status(500).json({
      message: "Order creation failed"
    });

  }

};


// GET ALL ORDERS
export const getOrders = async (req, res) => {

  try {

    const orders = await Order.find().sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    res.status(500).json({ message: "Failed to fetch orders" });

  }

};


// GET USER ORDERS
export const getMyOrders = async (req, res) => {

  try {

    const { username } = req.params;

    const orders = await Order.find({ username }).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    res.status(500).json({ message: "Failed to fetch user orders" });

  }

};


// UPDATE STATUS
export const updateOrderStatus = async (req, res) => {

  try {

    const { id } = req.params;
    const { status } = req.body;

    const updated = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      message: "Order status updated",
      order: updated
    });

  } catch (err) {

    res.status(500).json({ message: "Status update failed" });

  }

};