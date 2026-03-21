import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOrderSMS = async (order) => {

  try {

    const itemsText = order.items
      .map(i => `${i.name} (${i.weight}) x${i.qty}`)
      .join(", ");

    const adminMessage = `
New Order 🚀

Order ID: ${order.orderRef}
Customer: ${order.name}
Phone: ${order.mobile}

Items:
${itemsText}

Total: ₹${order.totalAmount}

Address:
${order.address}
`;

    const customerMessage = `
Thank you for your order 🙏

Order ID: ${order.orderRef}

Total: ₹${order.totalAmount}

VOV Foods
`;

    const customerPhone =
      order.mobile.startsWith("+") ? order.mobile : "+91" + order.mobile;

    console.log("Sending admin SMS...");

    await client.messages.create({
      body: adminMessage,
      from: process.env.TWILIO_PHONE,
      to: process.env.ADMIN_PHONE
    });

    console.log("Sending customer SMS...");

    await client.messages.create({
      body: customerMessage,
      from: process.env.TWILIO_PHONE,
      to: customerPhone
    });

    console.log("SMS sent successfully");

  } catch (error) {

    console.log("SMS error:", error.message);

  }

};

export default sendOrderSMS;