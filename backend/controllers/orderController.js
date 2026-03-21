import Order from "../models/Order.js";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// CREATE ORDER
export const createOrder = async (req, res) => {

  try {

    const order = new Order(req.body);
    const saved = await order.save();

    // Try sending SMS but do not crash if it fails
    try {

      const itemsText = saved.items
        .map(i => `${i.name} (${i.weight}) x${i.qty}`)
        .join(", ");

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

      const customerMessage = `
Thank you for your order 🙏

Order ID: ${saved.orderRef}
Total: ₹${saved.totalAmount}

VOV Foods
`;

      // SMS to admin
      await client.messages.create({
        body: adminMessage,
        from: process.env.TWILIO_PHONE,
        to: process.env.ADMIN_PHONE
      });

      // SMS to customer
      await client.messages.create({
        body: customerMessage,
        from: process.env.TWILIO_PHONE,
        to: "+91" + saved.mobile
      });

    } catch (smsError) {

      console.log("SMS failed:", smsError.message);

    }

    res.json(saved);

  } catch (err) {

    console.log("Order error:", err);

    res.status(500).json({
      message: "Order creation failed"
    });

  }

};