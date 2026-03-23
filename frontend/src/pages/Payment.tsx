import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Payment = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { formData, items, total } = location.state;

  const [paymentMethod, setPaymentMethod] = useState("");

  const placeOrder = async () => {

    if (!paymentMethod) {
      alert("Please select payment method");
      return;
    }

    const username = localStorage.getItem("username");

    const orderId = `VOV${Date.now().toString().slice(-8)}`;

    const orderData = {

      orderRef: orderId,

      name: formData.name,

      phone: formData.phone,

      address: `${formData.address}, ${formData.city} - ${formData.pincode}`,

      paymentMethod: paymentMethod,

      items: items.map((item: any) => ({
        productId: item.product._id || item.product.id,
        name: item.product.name,
        image: item.product.image,
        qty: item.quantity,
        weight: item.selectedWeight,
        price: item.price
      })),

      totalAmount: total,

      username: username

    };

    try {

      await axios.post(
        "https://vov-foods-1.onrender.com/api/order",
        orderData
      );

      navigate("/order-success", {
        state: { orderId }
      });

    } catch (error) {

      alert("Order failed");

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

            {/* PAYMENT METHODS */}

            <div className="lg:col-span-2 space-y-4">

              <div className="bg-white p-6 rounded-xl shadow">

                <label className="flex items-center gap-4 cursor-pointer">

                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    onChange={(e)=>setPaymentMethod(e.target.value)}
                  />

                  <span className="font-medium">
                    Cash on Delivery
                  </span>

                </label>

              </div>

              <div className="bg-white p-6 rounded-xl shadow">

                <label className="flex items-center gap-4 cursor-pointer">

                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    onChange={(e)=>setPaymentMethod(e.target.value)}
                  />

                  <span className="font-medium">
                    UPI Payment (PhonePe / Google Pay / Paytm)
                  </span>

                </label>

              </div>

              <div className="bg-white p-6 rounded-xl shadow">

                <label className="flex items-center gap-4 cursor-pointer">

                  <input
                    type="radio"
                    name="payment"
                    value="Debit Card"
                    onChange={(e)=>setPaymentMethod(e.target.value)}
                  />

                  <span className="font-medium">
                    Debit Card
                  </span>

                </label>

              </div>

              <div className="bg-white p-6 rounded-xl shadow">

                <label className="flex items-center gap-4 cursor-pointer">

                  <input
                    type="radio"
                    name="payment"
                    value="Credit Card"
                    onChange={(e)=>setPaymentMethod(e.target.value)}
                  />

                  <span className="font-medium">
                    Credit Card
                  </span>

                </label>

              </div>

            </div>

            {/* ORDER SUMMARY */}

            <div>

              <div className="bg-white rounded-xl p-6 shadow space-y-4">

                <h3 className="text-lg font-semibold">
                  Order Summary
                </h3>

                <div className="space-y-3 max-h-64 overflow-auto">

                  {items.map((item:any)=>(
                    
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
                >
                  Confirm Order
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