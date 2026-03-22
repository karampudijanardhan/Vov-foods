import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, User, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import axios from "axios";

const DELIVERY_CHARGE = 50;
const FREE_DELIVERY_MIN = 599;

const Checkout = () => {

  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const { items, subtotal } = state;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const deliveryCharge = subtotal >= FREE_DELIVERY_MIN ? 0 : DELIVERY_CHARGE;
  const total = subtotal + deliveryCharge;

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {

      alert("దయచేసి ముందుగా Login చేయండి 🙏");
      navigate("/login");
      return;

    }

    try {

      const orderId = `VOV${Date.now().toString().slice(-8)}`;

      const orderData = {

        orderRef: orderId,

        name: formData.name,

        phone: formData.phone,

        address: `${formData.address}, ${formData.city} - ${formData.pincode}`,

        items: items.map((item) => ({

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

      await axios.post(
  "https://vov-foods-1.onrender.com/api/order",
  orderData
);

      clearCart();

      navigate("/order-success", {
        state: { orderId, total, items: items.length }
      });

    } catch (error) {

      console.error("Order failed:", error);

      alert("Order place avvaledu. Please try again.");

    }

  };

  const handleChange = (e: any) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  if (items.length === 0) {

    navigate("/cart");

    return null;

  }

  return (

    <div className="min-h-screen bg-background">

      <div className="container py-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >

          <h1 className="font-display text-3xl font-bold text-foreground mb-8">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* FORM */}

            <div className="lg:col-span-2">

              <form
                onSubmit={handleSubmit}
                className="bg-card rounded-xl p-6 shadow-card space-y-6"
              >

                <h2 className="font-display text-xl font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Delivery Address
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">

                  <div className="space-y-2">

                    <Label htmlFor="name">Full Name</Label>

                    <div className="relative">

                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />

                    </div>

                  </div>

                  <div className="space-y-2">

                    <Label htmlFor="phone">Phone Number</Label>

                    <div className="relative">

                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />

                    </div>

                  </div>

                </div>

                <div className="space-y-2">

                  <Label htmlFor="address">Street Address</Label>

                  <Textarea
                    id="address"
                    name="address"
                    placeholder="House/Flat No., Street, Landmark"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="grid sm:grid-cols-2 gap-4">

                  <div className="space-y-2">

                    <Label htmlFor="city">City</Label>

                    <Input
                      id="city"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="space-y-2">

                    <Label htmlFor="pincode">Pincode</Label>

                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="Enter pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />

                  </div>

                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gradient-saffron hover:opacity-90"
                >
                  Place Order • ₹{total}
                </Button>

              </form>

            </div>

            {/* ORDER SUMMARY */}

            <div>

              <div className="bg-card rounded-xl p-6 shadow-card space-y-4 sticky top-32">

                <h3 className="font-display font-semibold text-lg">
                  Order Summary
                </h3>

                <div className="space-y-3 max-h-64 overflow-auto">

                  {items.map((item) => (

                    <div
                      key={`${item.product.id}-${item.selectedWeight}`}
                      className="flex gap-3"
                    >

                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                      <div className="flex-1 min-w-0">

                        <p className="font-medium text-sm line-clamp-1">
                          {item.product.name}
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {item.selectedWeight} × {item.quantity}
                        </p>

                        <p className="font-semibold">
                          ₹{item.price * item.quantity}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="border-t border-border pt-4 space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">

                    <span className="text-muted-foreground">Delivery</span>

                    <span className={deliveryCharge === 0 ? "text-cardamom" : ""}>
                      {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                    </span>

                  </div>

                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>

                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                  <Truck className="w-4 h-4 text-primary" />
                  <span>Expected delivery: 3-5 business days</span>
                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </div>

  );

};

export default Checkout;