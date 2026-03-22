import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsApp = async (order) => {

  try {

    const phone = order.phone || order.mobile;

    if (!phone) {
      console.log("❌ Phone number missing");
      return;
    }

    // correct WhatsApp format
    const customerPhone = `whatsapp:+91${phone}`;

    const message =
`VOV Foods

Order Confirmed ✅

Order ID: ${order.orderRef}
Amount: ₹${order.totalAmount}

Thank you for ordering!`;

    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: customerPhone
    });

    console.log("📱 WhatsApp message SID:", response.sid);

  } catch (error) {

    console.log("❌ WhatsApp error:", error.message);

  }

};

export default sendWhatsApp;