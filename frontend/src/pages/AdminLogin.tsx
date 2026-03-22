import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e:any)=>{
    e.preventDefault();

    try{

      const res = await axios.post(
        "https://vov-foods-1.onrender.com/api/admin/login",
        {email,password}
      );

      localStorage.setItem("adminToken",res.data.token);

      alert("Admin Login Success");

      navigate("/admin-dashboard");

    }catch(err:any){

      alert("Invalid Admin");

    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          <button
            className="w-full bg-black text-white py-2 rounded"
          >
            Login
          </button>

        </form>

      </div>

    </div>

  );
};

export default AdminLogin;