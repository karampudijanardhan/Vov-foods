const twilio = require("twilio");

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

Items:
${itemsText}

Total: ₹${order.totalAmount}

VOV Foods
`;

    await client.messages.create({
      body: adminMessage,
      from: process.env.TWILIO_PHONE,
      to: process.env.ADMIN_PHONE
    });

    await client.messages.create({
      body: customerMessage,
      from: process.env.TWILIO_PHONE,
      to: "+91" + order.mobile
    });

  } catch (error) {
    console.log("SMS error:", error);
  }
};

module.exports = sendOrderSMS;