import Order from "../models/Order.js";
import sendOrderSMS from "../services/sendOrderSMS.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {

    const order = new Order(req.body);
    const saved = await order.save();

    console.log("Order saved:", saved.orderRef);

    // send SMS
    await sendOrderSMS(saved);

    res.json(saved);

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

    res.status(500).json({
      message: "Orders fetch error"
    });

  }

};


// GET USER ORDERS
export const getMyOrders = async (req, res) => {

  try {

    const username = req.params.username;

    const orders = await Order.find({ username }).sort({ createdAt: -1 });

    res.json({ orders });

  } catch (err) {

    res.status(500).json({
      message: "Failed to fetch orders"
    });

  }

};


// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);

  } catch (err) {

    res.status(500).json({
      message: "Status update failed"
    });

  }

};