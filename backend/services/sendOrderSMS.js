import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOrderSMS = async (order) => {

  try {

    const phone = order.phone;

    if (!phone) {
      console.log("❌ No phone number");
      return;
    }

    const customerPhone = `whatsapp:+91${phone}`;
    const adminPhone = `whatsapp:+${process.env.ADMIN_PHONE}`;

    const customerMessage =
`🛒 VOV Foods Order Confirmed

Order ID: ${order.orderRef}
Total: ₹${order.totalAmount}

Thank you for ordering from VOV Foods ❤️`;

    const adminMessage =
`🔥 New Order - VOV Foods

Order ID: ${order.orderRef}

Customer: ${order.name}
Phone: ${phone}

Total: ₹${order.totalAmount}`;

    // SEND TO CUSTOMER
    await client.messages.create({
      body: customerMessage,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: customerPhone
    });

    // SEND TO ADMIN
    await client.messages.create({
      body: adminMessage,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: adminPhone
    });

    console.log("✅ WhatsApp messages sent");

  } catch (error) {

    console.log("❌ Twilio error:", error);

  }

};

export default sendOrderSMS;