import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const sendOrderSMS = async (order) => {
  try {
    console.log("🚀 SMS function started");

    if (!order || !order.phone) {
      console.log("❌ No phone number in order");
      return;
    }

    // CLEAN PHONE NUMBER
    const cleanPhone = order.phone.replace(/\D/g, "").slice(-10);

    console.log("📩 Sending SMS to:", cleanPhone);

    // ADMIN NUMBERS
    const adminNumbers = process.env.ADMIN_PHONE
      .split(",")
      .map(num => num.replace(/\D/g, "").slice(-10));

    // CREATE ITEM LIST
    const itemList = order.items
      .map(item => `${item.name} ${item.weight} × ${item.qty}`)
      .join("\n");

    // CUSTOMER MESSAGE
    const customerMessage = `VOV Foods Order Confirmed

Order ID: ${order.orderRef}

Total Amount: ₹${order.totalAmount}

Thank you for ordering from VOV Foods ❤️
Your order will be delivered soon.`;

    // ADMIN MESSAGE
    const adminMessage = `🔥 New Order - VOV Foods

Order ID: ${order.orderRef}

Customer: ${order.name}
Phone: ${cleanPhone}

Address:
${order.address}

Items:
${itemList}

Total: ₹${order.totalAmount}`;

    // 🔑 COMMON PARAMS
    const baseParams = {
      authorization: process.env.FAST2SMS_API_KEY,
      route: "q", // VERY IMPORTANT (no DLT)
      language: "english",
    };

    // ✅ SEND TO CUSTOMER
    const customerRes = await axios.get(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        params: {
          ...baseParams,
          message: customerMessage,
          numbers: cleanPhone,
        },
      }
    );

    console.log("✅ Customer SMS:", customerRes.data);

    // ✅ SEND TO ADMINS
    for (const adminPhone of adminNumbers) {
      console.log("📩 Sending SMS to admin:", adminPhone);

      const adminRes = await axios.get(
        "https://www.fast2sms.com/dev/bulkV2",
        {
          params: {
            ...baseParams,
            message: adminMessage,
            numbers: adminPhone,
          },
        }
      );

      console.log("✅ Admin SMS:", adminRes.data);
    }

    console.log("🎉 All SMS sent successfully (Fast2SMS)");

  } catch (error) {
    console.error("❌ Fast2SMS error:", error.response?.data || error.message);
  }
};

export default sendOrderSMS;