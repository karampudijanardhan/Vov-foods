import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { openWhatsAppChat, createOrderMessage } from "@/utils/whatsapp";

export const CartSummary = () => {
  const { state } = useCart();
  const { items, subtotal } = state;
  const navigate = useNavigate();

  // ✅ Delivery always FREE
  const deliveryCharge = 0;
  const total = subtotal;

  const handleWhatsAppOrder = () => {
    const orderItems = items.map((item) => ({
      name: item.product.name,
      weight: item.selectedWeight,
      quantity: item.quantity,
      price: item.price,
    }));
    const message = createOrderMessage(orderItems, total);
    openWhatsAppChat(message);
  };

  const handleProceedCheckout = () => {
    const token = localStorage.getItem("token");

    console.log("TOKEN =", token);

    if (!token) {
      alert("Please login to continue checkout 🔐");
      navigate("/login");
      return;
    }

    navigate("/checkout");
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-card space-y-4 sticky top-32">
      <h3 className="font-display font-semibold text-lg">Order Summary</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Subtotal ({items.length} items)
          </span>
          <span className="font-medium">₹{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery</span>
          <span className="font-medium text-cardamom">FREE</span>
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <Button
          type="button"
          className="w-full gradient-saffron hover:opacity-90"
          onClick={handleProceedCheckout}
        >
          Proceed to Checkout
        </Button>

        <Button
          variant="outline"
          className="w-full"
          onClick={handleWhatsAppOrder}
        >
          Order via WhatsApp
        </Button>
      </div>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          🔒 Secure checkout • 🚚 Fast delivery • ✨ Fresh products
        </p>
      </div>
    </div>
  );
};