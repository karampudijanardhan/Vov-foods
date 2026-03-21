import axios from "axios";

const sendOrderSMS = async (order) => {

  try {

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
    await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: process.env.FAST2SMS_API_KEY,
        route: "q",
        message: customerMessage,
        language: "english",
        flash: 0,
        numbers: customerPhone
      }
    });

    // ADMIN SMS
    await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: process.env.FAST2SMS_API_KEY,
        route: "q",
        message: adminMessage,
        language: "english",
        flash: 0,
        numbers: adminPhone
      }
    });

    console.log("SMS sent successfully");

  } catch (error) {

    console.log("SMS error:", error.response?.data || error.message);

  }

};

export default sendOrderSMS;