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

  {
    name: "Pickles",
    submenu: [
      { name: "Veg Pickles", path: "/category/veg-pickles" },
      { name: "Non Veg Pickles", path: "/category/nonveg-pickles" },
    ],
  },

  {
    name: "Powders",
    submenu: [
      { name: "Masala Powders", path: "/category/masala-powders" },
      { name: "Karam Podi", path: "/category/karampodi" },
    ],
  },

  {
    name: "Sweets",
    submenu: [
      { name: "Sweets", path: "/category/sweets" },
      { name: "Vadiyalu", path: "/category/vadiyalu" },
      { name: "Hot Snacks", path: "/category/hot-snacks" },
    ],
  },

  { name: "Special Items", path: "/category/special-items" },
  { name: "Offers", path: "/offers" },
];

export const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const itemCount = getItemCount();

  const [showLogout, setShowLogout] = useState(false);
  const token = localStorage.getItem("token");

  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<number | null>(null);

  const handleAdminClicks = async () => {

    clickCountRef.current += 1;

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

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

      const orderRef = prompt("Enter Order ID:");
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

      } catch {

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

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    setShowLogout(false);

    alert("Logged out 👋");
    navigate("/");

  };

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

{/* TOP BAR */}
<div className="bg-primary text-primary-foreground text-sm py-2">
<div className="container flex justify-between items-center">

<div className="flex items-center gap-4">

<a href="tel:+917731983479" className="flex items-center gap-1">
<Phone className="w-3 h-3" />
<span className="hidden sm:inline">+91 7731983479</span>
</a>

<Link to="/find-store" className="flex items-center gap-1">
<MapPin className="w-3 h-3" />
<span className="hidden sm:inline">Find a Store</span>
</Link>

</div>

<Link to="/offers" className="flex items-center gap-1">
<Gift className="w-3 h-3" />
<span>Get 20% Off on First Order!</span>
</Link>

</div>
</div>

{/* MAIN NAVBAR */}
<nav className="bg-background/95 backdrop-blur-md border-b shadow-sm">

<div className="container py-4">

{/* LOGO + SEARCH + CART */}
<div className="flex items-center justify-between gap-4">

<Link to="/" className="flex items-center gap-2 shrink-0">

<img
src="https://vovfoods.com/wp-content/uploads/2022/05/vovfoods-logo.png"
className="h-10"
/>

<div className="hidden sm:block">

<h1
className="font-bold text-xl cursor-pointer"
onClick={handleAdminClicks}
>
VOV FOODS
</h1>

<p className="text-xs text-muted-foreground">
TASTE OF VILLAGE FOODS
</p>

</div>

</Link>

<form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">

<div className="relative w-full">

<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />

<Input
type="search"
placeholder="Search pickles, powders, sweets..."
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
className="pl-10"
/>

</div>

</form>

{/* RIGHT SIDE */}
<div className="flex items-center gap-2">

<Link to="/cart">
<Button variant="ghost" size="icon" className="relative">

<ShoppingCart className="w-5 h-5" />

{itemCount > 0 && (
<motion.span
initial={{ scale: 0 }}
animate={{ scale: 1 }}
className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-xs flex items-center justify-center"
>
{itemCount}
</motion.span>
)}

</Button>
</Link>

{token ? (
<Link to="/my-orders">
<Button variant="outline" size="sm">My Orders</Button>
</Link>
) : (
<Link to="/login">
<Button variant="outline" size="sm">Login</Button>
</Link>
)}

{token && (
<Button
variant="outline"
size="sm"
onClick={handleLogout}
className="border-destructive text-destructive"
>
Logout
</Button>
)}

<Button
variant="ghost"
size="icon"
className="lg:hidden"
onClick={() => setIsMenuOpen(!isMenuOpen)}
>
{isMenuOpen ? <X /> : <Menu />}
</Button>

</div>
</div>

{/* DESKTOP NAV */}
<div className="hidden lg:flex items-center gap-1 mt-4 pt-4 border-t">

{navLinks.map((link) =>
link.submenu ? (
<div key={link.name} className="relative group">

<span className="px-4 py-2 text-sm font-medium cursor-pointer">
{link.name}
</span>

<div className="absolute left-0 mt-2 hidden group-hover:block bg-white border rounded-lg shadow-md min-w-[180px]">

{link.submenu.map((sub) => (
<Link
key={sub.path}
to={sub.path}
className="block px-4 py-2 text-sm hover:bg-muted"
>
{sub.name}
</Link>
))}

</div>
</div>
) : (

<Link
key={link.path}
to={link.path}
className="px-4 py-2 text-sm font-medium"
>
{link.name}
</Link>

)
)}

</div>

{/* MOBILE MENU */}
<AnimatePresence>
{isMenuOpen && (

<motion.div
initial={{ height: 0, opacity: 0 }}
animate={{ height: "auto", opacity: 1 }}
exit={{ height: 0, opacity: 0 }}
className="lg:hidden overflow-hidden border-t mt-4 pt-4"
>

<div className="flex flex-col">

{navLinks.map((link) =>
link.submenu ? (

<div key={link.name} className="border-b">

<button
onClick={() =>
setOpenMobileMenu(
openMobileMenu === link.name ? null : link.name
)
}
className="w-full text-left px-4 py-3 text-sm font-medium"
>
{link.name}
</button>

{openMobileMenu === link.name && (

<div className="pl-6 pb-2">

{link.submenu.map((sub) => (

<Link
key={sub.path}
to={sub.path}
onClick={() => {
setIsMenuOpen(false);
setOpenMobileMenu(null);
}}
className="block py-2 text-sm text-muted-foreground hover:text-primary"
>
{sub.name}
</Link>

))}

</div>
)}

</div>

) : (

<Link
key={link.path}
to={link.path}
onClick={() => setIsMenuOpen(false)}
className="px-4 py-3 text-sm border-b hover:bg-muted"
>
{link.name}
</Link>

)
)}

</div>

</motion.div>

)}
</AnimatePresence>

</div>

</nav>

</header>

);
};