import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Payment = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { formData, items, total } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [utr, setUtr] = useState("");
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("username");

  const orderId = `VOV${Date.now().toString().slice(-8)}`;

  /* UPI REDIRECT FUNCTION */

  const openUPIApp = () => {

    const upiId = "9121971848@ybl";
    const name = "Karampudi Janardhan";

    const upiLink =
      `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${total}&cu=INR`;

    window.location.href = upiLink;

  };

  const placeOrder = async () => {

    if (!formData || !items) {
      alert("Order data missing");
      return;
    }

    if (paymentMethod === "UPI" && !utr) {
      alert("Please enter UTR number");
      return;
    }

    const orderData = {

      orderRef: orderId,

      username: username,

      name: formData.name,

      phone: formData.phone,

      address: `${formData.address}, ${formData.city} - ${formData.pincode}`,

      paymentMethod: paymentMethod,

      utr: paymentMethod === "UPI" ? utr : null,

      paymentStatus:
        paymentMethod === "UPI"
          ? "Pending Verification"
          : "Pending",

      items: items.map((item: any) => ({
        productId: item.product._id || item.product.id,
        name: item.product.name,
        image: item.product.image,
        qty: item.quantity,
        weight: item.selectedWeight,
        price: item.price
      })),

      totalAmount: total

    };

    try {

      setLoading(true);

      const res = await axios.post(
        "https://vov-foods-1.onrender.com/api/order",
        orderData
      );

      if (res.data.success) {

        navigate("/order-success", {
          state: {
            orderId,
            total,
            items,
            createdAt: new Date().toISOString()
          }
        });

      }

    } catch (error) {

      console.error("Order error:", error);
      alert("Order failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-50">

      <div className="container mx-auto py-10">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >

          <h1 className="text-3xl font-bold mb-8">
            Select Payment Method
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* PAYMENT OPTIONS */}

            <div className="lg:col-span-2 space-y-4">

              {/* COD */}

              <div className="bg-white p-6 rounded-xl shadow">

                <label className="flex items-center gap-4 cursor-pointer">

                  <input
                    type="radio"
                    value="Cash on Delivery"
                    checked={paymentMethod === "Cash on Delivery"}
                    onChange={(e)=>setPaymentMethod(e.target.value)}
                  />

                  <div>

                    <p className="font-medium">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay when order arrives
                    </p>

                  </div>

                </label>

              </div>


              {/* UPI PAYMENT */}

              <div className="bg-white p-6 rounded-xl shadow space-y-4">

                <label className="flex items-center gap-4 cursor-pointer">

                  <input
                    type="radio"
                    value="UPI"
                    checked={paymentMethod === "UPI"}
                    onChange={(e)=>setPaymentMethod(e.target.value)}
                  />

                  <div>

                    <p className="font-medium">
                      UPI Payment
                    </p>

                    <p className="text-sm text-gray-500">
                      PhonePe / Google Pay / Paytm
                    </p>

                  </div>

                </label>


                {paymentMethod === "UPI" && (

                  <div className="space-y-4">

                    <h3 className="text-lg font-semibold text-center">
                      Scan & Pay
                    </h3>

                    <img
                      src="/public/qr.jpeg"
                      alt="UPI QR"
                      className="w-56 mx-auto"
                    />

                    <p className="text-center text-gray-500 text-sm">
                      Scan QR using PhonePe or GPay
                    </p>


                    {/* UPI REDIRECT BUTTONS */}

                    <div className="flex gap-4 justify-center">

<a
href={`upi://pay?pa=9121971848@ybl&pn=Karampudi%20Janardhan&am=${total}&cu=INR`}
className="bg-purple-600 text-white px-4 py-2 rounded"
>
PhonePe
</a>

<a
href={`upi://pay?pa=9121971848@ybl&pn=Karampudi%20Janardhan&am=${total}&cu=INR`}
className="bg-green-600 text-white px-4 py-2 rounded"
>
Google Pay
</a>

</div>


                    {/* UTR INPUT */}

                    <input
                      type="text"
                      placeholder="Enter UTR Number"
                      value={utr}
                      onChange={(e)=>setUtr(e.target.value)}
                      className="w-full border rounded-lg p-2"
                    />

                  </div>

                )}

              </div>

            </div>


            {/* ORDER SUMMARY */}

            <div>

              <div className="bg-white rounded-xl p-6 shadow space-y-4">

                <h3 className="text-lg font-semibold">
                  Order Summary
                </h3>

                <div className="space-y-3 max-h-64 overflow-auto">

                  {items?.map((item:any)=>(

                    <div
                      key={item.product.id}
                      className="flex gap-3"
                    >

                      <img
                        src={item.product.image}
                        className="w-14 h-14 rounded object-cover"
                      />

                      <div>

                        <p className="text-sm font-medium">
                          {item.product.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {item.selectedWeight} × {item.quantity}
                        </p>

                        <p className="font-semibold">
                          ₹{item.price * item.quantity}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="border-t pt-4">

                  <div className="flex justify-between text-lg font-bold">

                    <span>Total</span>
                    <span>₹{total}</span>

                  </div>

                </div>

                <Button
                  className="w-full mt-4"
                  onClick={placeOrder}
                  disabled={loading}
                >

                  {loading
                    ? "Placing Order..."
                    : "Confirm Order"}

                </Button>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </div>

  );

};

export default Payment;