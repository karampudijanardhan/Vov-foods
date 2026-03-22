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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setShowLogout(false);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setShowLogout(!!token);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

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

{/* NAVBAR */}
<nav className="bg-background border-b">

<div className="container py-4">

{/* LOGO + SEARCH + CART */}
<div className="flex items-center justify-between gap-4">

<Link to="/" className="flex items-center gap-2">

<img
src="https://vovfoods.com/wp-content/uploads/2022/05/vovfoods-logo.png"
className="h-10"
/>

</Link>

{/* SEARCH */}
<form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">

<div className="relative w-full">

<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />

<Input
type="search"
placeholder="Search pickles..."
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
<span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-xs flex items-center justify-center">
{itemCount}
</span>
)}

</Button>
</Link>

{/* DESKTOP LOGIN */}
<div className="hidden lg:flex gap-2">

{!showLogout ? (
<Link to="/login">
<Button size="sm">Login</Button>
</Link>
) : (
<>
<Link to="/my-orders">
<Button size="sm">My Orders</Button>
</Link>

<Button size="sm" onClick={handleLogout}>
Logout
</Button>
</>
)}

</div>

{/* MOBILE MENU BUTTON */}
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
<div className="hidden lg:flex gap-6 mt-4 border-t pt-4">

{navLinks.map((link) =>
link.submenu ? (

<div key={link.name} className="relative group">

<span className="cursor-pointer">{link.name}</span>

<div className="absolute hidden group-hover:block bg-white shadow rounded mt-2">

{link.submenu.map((sub) => (

<Link
key={sub.path}
to={sub.path}
className="block px-4 py-2 hover:bg-gray-100"
>
{sub.name}
</Link>

))}

</div>

</div>

) : (

<Link key={link.path} to={link.path}>
{link.name}
</Link>

)
)}

</div>

{/* MOBILE MENU */}
<AnimatePresence>
{isMenuOpen && (

<motion.div
initial={{ height: 0 }}
animate={{ height: "auto" }}
exit={{ height: 0 }}
className="lg:hidden border-t mt-4"
>

<div className="flex flex-col">

{navLinks.map((link) =>
link.submenu ? (

<div key={link.name} className="border-b">

<button
className="px-4 py-3 text-left w-full"
onClick={() =>
setOpenMobileMenu(
openMobileMenu === link.name ? null : link.name
)
}
>
{link.name}
</button>

{openMobileMenu === link.name && (

<div className="pl-6">

{link.submenu.map((sub) => (

<Link
key={sub.path}
to={sub.path}
className="block py-2"
onClick={() => setIsMenuOpen(false)}
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
className="px-4 py-3 border-b"
onClick={() => setIsMenuOpen(false)}
>
{link.name}
</Link>

)
)}

{showLogout && (
<Link
to="/my-orders"
className="px-4 py-3 border-b"
onClick={() => setIsMenuOpen(false)}
>
My Orders
</Link>
)}

{!showLogout ? (

<Link
to="/login"
className="px-4 py-3 border-b"
onClick={() => setIsMenuOpen(false)}
>
Login
</Link>

) : (

<button
onClick={() => {
handleLogout();
setIsMenuOpen(false);
}}
className="px-4 py-3 text-left"
>
Logout
</button>

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