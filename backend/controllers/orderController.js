import Order from "../models/Order.js";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

// Twilio setup
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


// ================= CREATE ORDER =================
export const createOrder = async (req, res) => {

  try {

    const order = new Order(req.body);

    const saved = await order.save();

    try {

      const itemsText = saved.items
        .map(i => `${i.name} (${i.weight}) x${i.qty}`)
        .join(", ");

      // Admin SMS
      const adminMessage = `
New Order 🚀

Order ID: ${saved.orderRef}

Customer: ${saved.name}
Phone: ${saved.mobile}

Items:
${itemsText}

Total: ₹${saved.totalAmount}

Address:
${saved.address}
`;

      // Customer SMS
      const customerMessage = `
Thank you for your order 🙏

Order ID: ${saved.orderRef}

Total: ₹${saved.totalAmount}

VOV Foods
`;

      // Send admin SMS
      await client.messages.create({
        body: adminMessage,
        from: process.env.TWILIO_PHONE,
        to: process.env.ADMIN_PHONE
      });

      // Send customer SMS
      await client.messages.create({
        body: customerMessage,
        from: process.env.TWILIO_PHONE,
        to: "+91" + saved.mobile
      });

    } catch (smsError) {

      console.log("SMS sending failed:", smsError.message);

    }

    res.json(saved);

  } catch (err) {

    console.log("Order creation error:", err);

    res.status(500).json({
      message: "Order creation failed"
    });

  }

};


// ================= GET ALL ORDERS (ADMIN) =================
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


// ================= GET USER ORDERS =================
export const getMyOrders = async (req, res) => {

  try {

    const username = req.params.username;

    const orders = await Order.find({ username }).sort({ createdAt: -1 });

    res.json({ orders });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch orders"
    });

  }

};


// ================= UPDATE ORDER STATUS =================
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