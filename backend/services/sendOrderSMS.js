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

    // ✅ CLEAN CUSTOMER NUMBER (10 digits only)
    const cleanPhone = order.phone.replace(/\D/g, "").slice(-10);

    console.log("📩 Customer Number:", cleanPhone);

    // ✅ ADMIN NUMBERS (from .env)
    const adminNumbers = process.env.ADMIN_PHONE
      .split(",")
      .map(num => num.replace(/\D/g, "").slice(-10));

    // ✅ ITEMS LIST (short format to avoid SMS cut)
    const itemList = order.items
      .map(item => `${item.name}(${item.qty})`)
      .join(", ");

    // ✅ CUSTOMER MESSAGE (safe)
    const customerMessage =
`VOV Foods Order Confirmed
Order ID: ${order.orderRef}
Total: Rs.${order.totalAmount}
Thank you!`;

    // ✅ ADMIN MESSAGE (optimized under limit)
    const adminMessage =
`New Order - VOV
ID: ${order.orderRef}
Name: ${order.name}
Phone: ${cleanPhone}
Addr: ${order.address}
Items: ${itemList}
Total: Rs.${order.totalAmount}`;

    console.log("📦 ADMIN MESSAGE:\n", adminMessage);

    // ✅ COMMON PARAMS
    const baseParams = {
      authorization: process.env.FAST2SMS_API_KEY,
      route: "q", // IMPORTANT
      language: "english",
    };

    // 🔹 SEND SMS TO CUSTOMER
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

    console.log("✅ Customer SMS Sent:", customerRes.data);

    // 🔹 SEND SMS TO ADMINS
    for (const adminPhone of adminNumbers) {
      console.log("📩 Sending to admin:", adminPhone);

      const adminRes = await axios.get(
        "https://www.fast2sms.com/dev/bulkV2",
        {
          params: {
            ...baseParams,
            message: adminMessage, // ✅ FIXED
            numbers: adminPhone,
          },
        }
      );

      console.log("✅ Admin SMS Sent:", adminRes.data);
    }

    console.log("🎉 All SMS sent successfully");

  } catch (error) {
    console.error(
      "❌ Fast2SMS Error:",
      error.response?.data || error.message
    );
  }
};

export default sendOrderSMS;