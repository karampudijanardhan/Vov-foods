import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {

  const [orders,setOrders] = useState([]);

  const fetchOrders = async () => {

    try {

      const res = await axios.get(
        "https://vov-foods-1.onrender.com/api/orders"
      );

      setOrders(res.data);

    } catch(err){

      console.log(err);

    }

  };

  useEffect(()=>{
    fetchOrders();
  },[]);

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Orders
      </h1>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">UTR</th>
              <th className="p-3 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order:any)=>(

              <tr key={order._id} className="border-t">

                <td className="p-3">
                  {order.orderRef}
                </td>

                <td className="p-3">
                  {order.name}
                </td>

                <td className="p-3">
                  {order.phone}
                </td>

                <td className="p-3">
                  {order.address}
                </td>

                <td className="p-3 font-semibold">
                  ₹{order.totalAmount}
                </td>

                <td className="p-3">
                  {order.paymentMethod}
                </td>

                <td className="p-3">

                  {order.utr
                    ? order.utr
                    : "-"}

                </td>

                <td className="p-3">

                  {order.paymentStatus ===
                  "Pending Verification" ? (

                    <span className="text-orange-500 font-medium">
                      Verify Payment
                    </span>

                  ) : (

                    <span className="text-green-600 font-medium">
                      Paid
                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default AdminOrders;