import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOrderSMS = async (order) => {

  try {

    const customerPhone = `+91${order.phone}`;
    const adminPhone = `+91${process.env.ADMIN_PHONE}`;

    // CUSTOMER MESSAGE
    const customerMessage =
`Vov Foods Order Confirmed

Order ID: ${order.orderRef}
Amount: ₹${order.totalAmount}

Thank you for ordering!`;

    // ADMIN MESSAGE (SHORT VERSION)
    const adminMessage =
`New Order - VovFoods
ID: ${order.orderRef}
Customer: ${order.name}
Phone: ${order.phone}
Total: ₹${order.totalAmount}`;

    // Send SMS to customer
    const customerSMS = await client.messages.create({
      body: customerMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: customerPhone
    });

    console.log("Customer SMS SID:", customerSMS.sid);

    // Send SMS to admin
    const adminSMS = await client.messages.create({
      body: adminMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: adminPhone
    });

    console.log("Admin SMS SID:", adminSMS.sid);

    console.log("✅ SMS process completed");

  } catch (error) {

    console.log("❌ Twilio SMS error:", error.message);

  }

};

export default sendOrderSMS;