import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Menu,
  LayoutDashboard,
  ShoppingCart,
  CreditCard,
  Package,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  /* ✅ AUTO CLOSE MENU ON ROUTE CHANGE */
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const activeLink = (path: string) =>
    location.pathname === path
      ? "gradient-saffron text-white"
      : "text-muted-foreground hover:bg-muted";

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <>
      {/* ✅ MOBILE MENU BUTTON (FIXED POSITION) */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-border p-2 rounded-lg shadow-md"
      >
        <Menu size={22} />
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-card border-r border-border p-6 shadow-card
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}

          lg:static lg:translate-x-0 lg:flex lg:flex-col lg:justify-between lg:min-h-screen
        `}
      >

        <div>

          <h2 className="text-2xl font-display text-spice-brown mb-10">
            VOV Admin
          </h2>

          <nav className="space-y-3">

            <Link
              to="/admin-dashboard"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeLink("/admin-dashboard")}`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              to="/admin-orders"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeLink("/admin-orders")}`}
            >
              <ShoppingCart size={18} />
              Orders
            </Link>

            <Link
              to="/admin-payments"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeLink("/admin-payments")}`}
            >
              <CreditCard size={18} />
              Payments
            </Link>

            <Link
              to="/admin-products"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${activeLink("/admin-products")}`}
            >
              <Package size={18} />
              Products
            </Link>

          </nav>

        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-10 w-full py-2 rounded-lg bg-destructive text-white hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </button>

      </aside>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 lg:hidden z-30"
        />
      )}

      {/* MOBILE BOTTOM NAV */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-card border-t shadow-lg rounded-t-2xl z-40 flex justify-around py-2">

        <Link to="/admin-dashboard" className="flex flex-col items-center text-xs">
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link to="/admin-orders" className="flex flex-col items-center text-xs">
          <ShoppingCart size={20} />
          Orders
        </Link>

        <Link to="/admin-payments" className="flex flex-col items-center text-xs">
          <CreditCard size={20} />
          Payments
        </Link>

        <Link to="/admin-products" className="flex flex-col items-center text-xs">
          <Package size={20} />
          Products
        </Link>

        <button
          onClick={handleLogout}
          className="flex flex-col items-center text-xs text-red-500"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>
    </>
  );
};

export default AdminSidebar;