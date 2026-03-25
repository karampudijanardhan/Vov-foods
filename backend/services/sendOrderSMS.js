import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

// CHECK REQUIRED ENV VARIABLES
if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
  console.error("❌ Twilio credentials missing in .env");
}

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOrderSMS = async (order) => {
  try {

    if (!order || !order.phone) {
      console.log("❌ No phone number in order");
      return;
    }

    // CLEAN PHONE NUMBER
    const cleanPhone = order.phone.replace(/\D/g, "");

    const customerPhone = `+91${cleanPhone}`;

    // MULTIPLE ADMINS (comma separated in .env)
    const adminNumbers = process.env.ADMIN_PHONE.split(",").map(num => `+${num}`);

    // CREATE ITEM LIST
    const itemList = order.items
      .map(item => `${item.name} ${item.weight} × ${item.qty}`)
      .join("\n");

    // CUSTOMER MESSAGE
    const customerMessage = `
VOV Foods Order Confirmed

Order ID: ${order.orderRef}

Total Amount: ₹${order.totalAmount}

Thank you for ordering from VOV Foods ❤️
Your order will be delivered soon.
`;

    // ADMIN MESSAGE
    const adminMessage = `
🔥 New Order - VOV Foods

Order ID: ${order.orderRef}

Customer: ${order.name}
Phone: ${cleanPhone}

Address:
${order.address}

Items:
${itemList}

Total: ₹${order.totalAmount}
`;

    console.log("📩 Sending SMS to customer:", customerPhone);

    // SEND TO CUSTOMER
    const customerMSG = await client.messages.create({
      body: customerMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: customerPhone
    });

    console.log("✅ Customer SMS SID:", customerMSG.sid);

    // SEND TO ALL ADMINS
    for (const adminPhone of adminNumbers) {

      console.log("📩 Sending SMS to admin:", adminPhone);

      const adminMSG = await client.messages.create({
        body: adminMessage,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: adminPhone
      });

      console.log("✅ Admin SMS SID:", adminMSG.sid);
    }

    console.log("🎉 All SMS messages sent successfully");

  } catch (error) {

    console.error("❌ Twilio SMS error:", error.message);

  }
};

export default sendOrderSMS;