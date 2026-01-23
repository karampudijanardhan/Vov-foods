import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, Menu, X, MapPin, Phone, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import axios from "axios";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Pickles", path: "/category/pickles" },
  { name: "Powders", path: "/category/powders" },
  { name: "Sweets", path: "/category/sweets" },
  { name: "Offers", path: "/offers" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const itemCount = getItemCount();

  // ✅ UI auth state (no refresh persistence)
  const [showLogout, setShowLogout] = useState(false);

  // 🔐 3-click hidden admin logic
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<number | null>(null);

  const handleAdminClicks = async () => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    clickTimerRef.current = window.setTimeout(() => {
      clickCountRef.current = 0;
    }, 1500);

    if (clickCountRef.current === 3) {
      clickCountRef.current = 0;

      const pass = prompt("Admin access code:");
      if (pass !== "vov123") {
        alert("❌ Wrong code");
        return;
      }

      const orderRef = prompt("Enter Order ID (e.g. AMK71218480):");
      if (!orderRef) return;

      const status = prompt(
        "Enter Status:\nPLACED\nPACKING\nSHIPPED\nOUT_FOR_DELIVERY\nDELIVERED"
      );
      if (!status) return;

      try {
        await axios.put("https://vov-foods-1.onrender.com/api/order/status", {
          orderRef: orderRef.trim(),
          status: status.trim(),
        });

        alert("✅ Order status updated successfully!");
      } catch (err) {
        console.error("Admin update error:", err);
        alert("❌ Failed to update order");
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  // ✅ REAL LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setShowLogout(false);

    alert("Logged out 👋");
    navigate("/");
  };

  // ✅ LISTEN FOR LOGIN SUCCESS EVENT
  useEffect(() => {
    const onLoginSuccess = () => {
      setShowLogout(true);
    };

    window.addEventListener("login-success", onLoginSuccess);
    return () => {
      window.removeEventListener("login-success", onLoginSuccess);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-sm py-2">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Phone className="w-3 h-3" />
              <span className="hidden sm:inline">+91 7731983479</span>
            </a>
            <Link
              to="/find-store"
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <MapPin className="w-3 h-3" />
              <span className="hidden sm:inline">Find a Store</span>
            </Link>
          </div>
          <Link
            to="/offers"
            className="flex items-center gap-1 hover:opacity-80 transition-opacity"
          >
            <Gift className="w-3 h-3" />
            <span>Get 20% Off on First Order!</span>
          </Link>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-39 h-12 rounded-full flex items-center justify-center">
                <img
                  src="https://vovfoods.com/wp-content/uploads/2022/05/vovfoods-logo.png"
                  alt="VOV Foods Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>

              <div className="hidden sm:block">
                <h1
                  className="font-display font-bold text-xl text-foreground leading-tight cursor-pointer select-none"
                  onClick={handleAdminClicks}
                >
                  VOV FOODS
                </h1>
                <p className="text-xs text-muted-foreground">
                  TASTE OF VILLAGE FOODS
                </p>
              </div>
            </Link>

            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-md mx-4"
            >
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search pickles, powders, sweets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 bg-muted/50 border-0 focus-visible:ring-primary"
                />
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* 🔐 LOGIN / LOGOUT (DESKTOP) */}
              {showLogout ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="hidden lg:block border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition"
                >
                  Logout
                </Button>
              ) : (
                <Link to="/login" className="hidden lg:block">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition"
                  >
                    Login
                  </Button>
                </Link>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => navigate("/search")}
              >
                <Search className="w-5 h-5" />
              </Button>

              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium"
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1 mt-4 pt-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* 🆕 My Orders (only when logged in) */}
            {showLogout && (
              <Link
                to="/my-orders"
                className="px-4 py-2 text-sm font-medium text-primary hover:text-primary hover:bg-muted rounded-lg transition-colors"
              >
                My Orders
              </Link>
            )}

            <div className="ml-auto flex gap-2">
              <Link to="/support">
                <Button variant="outline" size="sm">Support</Button>
              </Link>

              {/* 🔁 Track Order (only when logged in) */}
              {showLogout && (
                <Link to="/track-order">
                  <Button variant="outline" size="sm">Track Order</Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border bg-background"
            >
              <div className="container py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}

                {/* 🆕 My Orders (only when logged in) */}
                {showLogout && (
                  <Link
                    to="/my-orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-primary hover:bg-muted rounded-lg transition-colors"
                  >
                    My Orders
                  </Link>
                )}

                <div className="pt-2 border-t border-border space-y-1">
                  {/* 🔐 LOGIN / LOGOUT (MOBILE) */}
                  {showLogout ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full justify-start border-destructive text-destructive"
                    >
                      Logout
                    </Button>
                  ) : (
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start border-primary text-primary"
                      >
                        Login
                      </Button>
                    </Link>
                  )}

                  <Link to="/support" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Support
                    </Button>
                  </Link>

                  {/* 🔁 Track Order (only when logged in) */}
                  {showLogout && (
                    <Link to="/track-order" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Track Order
                      </Button>
                    </Link>
                  )}

                  <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      About Us
                    </Button>
                  </Link>

                  <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Contact
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
