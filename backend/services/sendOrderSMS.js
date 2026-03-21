import axios from "axios";

const sendOrderSMS = async (order) => {

  console.log("📩 SMS service started");

  try {

    const customerPhone = order.phone;
    const adminPhone = process.env.ADMIN_PHONE;

    console.log("Customer phone:", customerPhone);
    console.log("Admin phone:", adminPhone);

    const message = `Order ${order.orderRef} confirmed`;

    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: message,
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

    console.log("SMS response:", response.data);

  } catch (error) {

    console.log("❌ SMS error:", error.response?.data || error.message);

  }

};

export default sendOrderSMS;