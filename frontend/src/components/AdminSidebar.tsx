import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";

const AdminSidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-5 left-5 z-50 bg-card border border-border p-2 rounded-lg shadow-md"
      >
        <Menu size={22} />
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
        fixed lg:static top-0 left-0 z-40
        w-64 min-h-screen bg-card border-r border-border pt-16 p-6 shadow-card
        flex flex-col justify-between
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        `}
      >

        <div>

          <h2 className="text-2xl font-display text-spice-brown mb-10">
            VOV Admin
          </h2>

          <nav className="space-y-3">

            <Link
              to="/admin-dashboard"
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-lg transition ${activeLink("/admin-dashboard")}`}
            >
              Dashboard
            </Link>

            <Link
              to="/admin-orders"
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-lg transition ${activeLink("/admin-orders")}`}
            >
              Orders
            </Link>

            <Link
              to="/admin-products"
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-lg transition ${activeLink("/admin-products")}`}
            >
              Products
            </Link>

            <Link
              to="/admin-add-product"
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-lg transition ${activeLink("/admin-add-product")}`}
            >
              Add Product
            </Link>

          </nav>

        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-10 w-full py-2 rounded-lg bg-destructive text-white hover:opacity-90 transition"
        >
          Logout
        </button>

      </aside>

      {/* DARK OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 lg:hidden"
        />
      )}
    </>
  );
};

export default AdminSidebar;