import axios from "axios";

const sendOrderSMS = async (order) => {

  try {

    console.log("📩 SMS service started");

    const customerPhone = order.phone;
    const adminPhone = process.env.ADMIN_PHONE;

    const customerMessage =
`Vov Foods Order Confirmed
Order ID: ${order.orderRef}
Amount: ₹${order.totalAmount}`;

    const adminMessage =
`New Order Received
Order ID: ${order.orderRef}
Customer: ${order.name}
Phone: ${order.phone}
Amount: ₹${order.totalAmount}`;

    // CUSTOMER SMS
    const customerSMS = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: customerMessage,
        language: "english",
        flash: 0,
        numbers: customerPhone
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Customer SMS response:", customerSMS.data);

    // ADMIN SMS
    const adminSMS = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: adminMessage,
        language: "english",
        flash: 0,
        numbers: adminPhone
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Admin SMS response:", adminSMS.data);

    console.log("✅ SMS sent successfully");

  } catch (error) {

    console.log("❌ SMS error:", error.response?.data || error.message);

  }

};

export default sendOrderSMS;