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
      console.log("❌ No phone number in order");
      return;
    }

    const customerPhone = `whatsapp:+91${phone}`;
    const adminPhone = `whatsapp:+${process.env.ADMIN_PHONE}`;

    // CREATE ITEM LIST
    const itemList = order.items
      .map(item => `${item.name} ${item.weight} × ${item.qty}`)
      .join("\n");

    // CUSTOMER MESSAGE
    const customerMessage =
`🛒 VOV Foods Order Confirmed

Order ID: ${order.orderRef}

Total Amount: ₹${order.totalAmount}

Thank you for ordering from VOV Foods ❤️
We will deliver your order soon.`;

    // ADMIN MESSAGE
    const adminMessage =
`🔥 New Order - VOV Foods

Order ID: ${order.orderRef}

Customer: ${order.name}
Phone: ${phone}

Address:
${order.address}

Items:
${itemList}

Total: ₹${order.totalAmount}`;

    console.log("📩 Sending WhatsApp to customer:", customerPhone);

    // SEND TO CUSTOMER
    const customerMSG = await client.messages.create({
      body: customerMessage,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: customerPhone
    });

    console.log("Customer WhatsApp SID:", customerMSG.sid);

    // SEND TO ADMIN
    const adminMSG = await client.messages.create({
      body: adminMessage,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: adminPhone
    });

    console.log("Admin WhatsApp SID:", adminMSG.sid);

    console.log("✅ WhatsApp messages sent successfully");

  } catch (error) {

    console.log("❌ Twilio WhatsApp error:", error);

  }

};

export default sendOrderSMS;