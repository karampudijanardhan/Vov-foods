import axios from "axios";

const sendOrderSMS = async (order) => {

  console.log("📩 SMS function started");

  try {

      console.log("Order data:", order);
      console.log("API KEY:", process.env.FAST2SMS_API_KEY);

    const phone = order.phone;

    console.log("Customer phone:", phone);

    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q",
        message: `Vov Foods order ${order.orderRef} confirmed`,
        language: "english",
        flash: 0,
        numbers: phone
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