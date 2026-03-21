import Order from "../models/Order.js";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

// Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Get orders for logged user
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


// CREATE ORDER + SEND SMS
export const createOrder = async (req,res) => {

  try{

    const order = new Order(req.body);

    const saved = await order.save();

    // ---------- CREATE ITEMS TEXT ----------
    const itemsText = saved.items
      .map(i => `${i.name} (${i.weight}) x${i.qty}`)
      .join(", ");

    // ---------- ADMIN MESSAGE ----------
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

    // ---------- CUSTOMER MESSAGE ----------
    const customerMessage = `
Thank you for your order 🙏

Order ID: ${saved.orderRef}

Items:
${itemsText}

Total: ₹${saved.totalAmount}

VOV Foods
`;

    // ---------- SEND SMS TO ADMIN ----------
    await client.messages.create({
      body: adminMessage,
      from: process.env.TWILIO_PHONE,
      to: process.env.ADMIN_PHONE
    });

    // ---------- SEND SMS TO CUSTOMER ----------
    await client.messages.create({
      body: customerMessage,
      from: process.env.TWILIO_PHONE,
      to: "+91" + saved.mobile
    });

    res.json(saved);

  }catch(err){

    console.log(err);

    res.status(500).json({
      message:"Order creation failed"
    });

  }

};


// GET ALL ORDERS (ADMIN)
export const getOrders = async (req,res) => {

  try{

    const orders = await Order.find().sort({createdAt:-1});

    res.json(orders);

  }catch(err){

    res.status(500).json({
      message:"Orders fetch error"
    });

  }

};


// UPDATE ORDER STATUS
export const updateOrderStatus = async (req,res) => {

  try{

    const {status} = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {status},
      {new:true}
    );

    res.json(order);

  }catch(err){

    res.status(500).json({
      message:"Status update failed"
    });

  }

};