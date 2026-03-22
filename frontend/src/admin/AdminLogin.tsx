import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface AdminForm {
  email: string;
}

const AdminLogin: React.FC = () => {

  const [form, setForm] = useState<AdminForm>({
    email: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // simple admin check
    if (form.email === "janardhankarampudi@gmail.com") {

      localStorage.setItem("admin", "true");

      alert("Admin login successful ✅");

      navigate("/admin-dashboard");

    } else {

      alert("Invalid admin email ❌");

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm px-4">

      <div className="w-full max-w-md bg-card text-card-foreground rounded-xl shadow-card p-8">

        <h2 className="text-2xl font-display text-center mb-6 text-spice-brown">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm mb-1 text-muted-foreground">
              Admin Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter admin email"
              className="w-full px-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg gradient-saffron text-primary-foreground font-medium shadow-warm hover:shadow-hover transition"
          >
            Login as Admin
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;