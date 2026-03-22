import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const activeLink = (path: string) =>
    location.pathname === path
      ? "gradient-saffron text-white"
      : "text-muted-foreground hover:bg-muted";

  const handleLogout = () => {
    localStorage.removeItem("admin"); // remove admin session
    navigate("/"); // go to user home page
  };

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border p-6 shadow-card flex flex-col justify-between">

      <div>
        <h2 className="text-2xl font-display text-spice-brown mb-10">
          VOV Admin
        </h2>

        <nav className="space-y-3">

          <Link
            to="/admin-dashboard"
            className={`block px-4 py-2 rounded-lg transition ${activeLink("/admin-dashboard")}`}
          >
            Dashboard
          </Link>

          <Link
            to="/admin-orders"
            className={`block px-4 py-2 rounded-lg transition ${activeLink("/admin-orders")}`}
          >
            Orders
          </Link>

          <Link
            to="/admin-products"
            className={`block px-4 py-2 rounded-lg transition ${activeLink("/admin-products")}`}
          >
            Products
          </Link>

          <Link
            to="/admin-add-product"
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
  );
};

export default AdminSidebar;