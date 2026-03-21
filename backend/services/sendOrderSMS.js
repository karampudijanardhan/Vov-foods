import axios from "axios";

const sendOrderSMS = async (order) => {

  try {

    const customerPhone = order.phone;
    const adminPhone = process.env.ADMIN_PHONE;

    const customerMessage = `Vov Foods Order Confirmed

Name: ${order.name}
Amount: ₹${order.totalAmount}

Thank you for your order!`;

    const adminMessage = `New Order Received

Customer: ${order.name}
Phone: ${order.phone}
Address: ${order.address}

Amount: ₹${order.totalAmount}`;

    // Customer SMS
    await axios.post(
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

    // Admin SMS
    await axios.post(
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

    console.log("SMS sent successfully");

  } catch (error) {

    console.log("SMS Error:", error.message);

  }

};

export default sendOrderSMS;