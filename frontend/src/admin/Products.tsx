import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "./AdminLayout";

const Products = () => {

  const [products,setProducts] = useState<any[]>([]);

  // Load products from backend
  useEffect(()=>{

    fetchProducts();

  },[]);

  const fetchProducts = async ()=>{

    try{

      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);

    }catch(err){

      console.error("Error loading products",err);

    }

  };

  // Delete product
  const deleteProduct = async(id:string)=>{

    try{

      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      setProducts(products.filter(p => p._id !== id));

    }catch(err){

      console.error("Delete error",err);

    }

  };

  // ✅ Reset stock (clear frontend storage)
  const resetStock = () => {

    localStorage.removeItem("products");

    alert("Stock reset successfully!");

  };

  return (

    <AdminLayout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-display text-spice-brown">
          Products
        </h1>

        {/* Reset Stock Button */}
        <button
          onClick={resetStock}
          className="px-4 py-2 rounded bg-secondary text-white"
        >
          Reset Stock
        </button>

      </div>

      <div className="bg-card shadow-card rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-muted">

            <tr>

              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Delete</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product:any)=>(

              <tr key={product._id} className="border-t border-border">

                <td className="p-3">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded object-cover"
                  />

                </td>

                <td className="p-3">{product.name}</td>

                <td className="p-3">{product.category}</td>

                <td className="p-3">{product.stock}</td>

                <td className="p-3">

                  <button
                    onClick={()=>deleteProduct(product._id)}
                    className="px-3 py-1 rounded bg-destructive text-white"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );
};

export default Products;