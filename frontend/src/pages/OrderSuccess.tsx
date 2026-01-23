import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    orderId,
    total,
    items,
    createdAt,
  } = location.state || {
    orderId: "AMK00000000",
    total: 0,
    items: 0,
    createdAt: new Date().toISOString(),
  };

  // 🔐 Safety: if user opens directly
  if (!location.state) {
    return (
      <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
        <div className="bg-card shadow-card rounded-xl p-8 text-center max-w-md w-full">
          <h2 className="text-xl font-display font-semibold text-spice-brown mb-2">
            Invalid Order
          </h2>
          <p className="text-muted-foreground mb-4">
            Order details not found. Please place an order first.
          </p>
          <Button onClick={() => navigate("/products")}>
            Go to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-24 h-24 mx-auto gradient-saffron rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12 text-primary-foreground" />
        </motion.div>

        <div className="space-y-2">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Order Placed!
          </h1>
          <p className="text-muted-foreground">
            Thank you for your order. We're preparing your delicious items!
          </p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card space-y-4">
          <div className="flex items-center justify-center gap-2 text-primary">
            <Package className="w-5 h-5" />
            <span className="font-semibold">Order ID: {orderId}</span>
          </div>

          {/* 🕒 Order date & time */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{new Date(createdAt).toLocaleString()}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-muted-foreground">Items</p>
              <p className="font-bold text-lg">{items}</p>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-muted-foreground">Total</p>
              <p className="font-bold text-lg">₹{total}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            You will receive an SMS confirmation shortly with delivery updates.
          </p>
        </div>

        <div className="space-y-3">
          {/* 🔥 Dynamic tracking link */}
          <Link to={`/track/${orderId}`}>
            <Button className="w-full gradient-saffron hover:opacity-90 gap-2">
              Track Your Order
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          {/* 🆕 My Orders */}
          <Link to="/my-orders">
            <Button variant="outline" className="w-full">
              View My Orders
            </Button>
          </Link>

          <Link to="/products">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground">
          Need help?{" "}
          <Link to="/support" className="text-primary hover:underline">
            Contact Support
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
