import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Package, ChefHat, Truck, Bike, CheckCircle } from "lucide-react";

const statusOrder = [
  "PLACED",
  "PACKING",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED"
];

const stepMeta = [
  {
    key: "PLACED",
    icon: Package,
    title: "Order Placed",
    desc: "Your order has been confirmed"
  },
  {
    key: "PACKING",
    icon: ChefHat,
    title: "Preparing",
    desc: "We're preparing your items"
  },
  {
    key: "SHIPPED",
    icon: Truck,
    title: "Shipped",
    desc: "Your order left our kitchen"
  },
  {
    key: "OUT_FOR_DELIVERY",
    icon: Bike,
    title: "Out for Delivery",
    desc: "Your order is almost there"
  },
  {
    key: "DELIVERED",
    icon: CheckCircle,
    title: "Delivered",
    desc: "Enjoy your order!"
  }
];

const TrackOrder = () => {

  const { orderId } = useParams();

  const [status,setStatus] = useState("");
  const [loading,setLoading] = useState(true);

  useEffect(()=>{

    const fetchStatus = async()=>{

      try{

        const res = await axios.get(
          `https://vov-foods-1.onrender.com/api/order/track/${orderId}`
        );

        setStatus(res.data.status);

      }catch(err){

        console.log(err);

      }finally{

        setLoading(false);

      }

    };

    fetchStatus();

  },[orderId]);

  const currentIndex = statusOrder.indexOf(status);

  return (

    <div className="min-h-screen bg-background">

      <section className="gradient-warm py-12">
        <div className="container text-center">

          <h1 className="font-display text-4xl font-bold mb-2">
            Track Your Order
          </h1>

          <p className="text-muted-foreground">
            Order ID: {orderId}
          </p>

        </div>
      </section>

      <section className="container py-12 max-w-2xl">

        <div className="bg-card rounded-xl p-8 shadow-card border-2 border-gray-300 hover:border-orange-400 transition">

          {loading && (
            <p className="text-center text-muted-foreground">
              Loading order status...
            </p>
          )}

          {!loading && (

            <div>

              {stepMeta.map((step,i)=>{

                const done = i <= currentIndex;

                return(

                  <motion.div
                    key={step.key}
                    initial={{opacity:0,x:-20}}
                    animate={{opacity:1,x:0}}
                    transition={{delay:i*0.2}}
                    className="flex gap-4"
                  >

                    <div className="flex flex-col items-center">

                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          done ? "gradient-saffron" : "bg-muted"
                        }`}
                      >

                        <step.icon
                          className={`w-6 h-6 ${
                            done
                              ? "text-primary-foreground"
                              : "text-muted-foreground"
                          }`}
                        />

                      </div>

                      {i < stepMeta.length-1 && (

                        <div
                          className={`w-0.5 h-16 ${
                            done ? "bg-primary" : "bg-border"
                          }`}
                        />

                      )}

                    </div>

                    <div className="pb-8">

                      <h3
                        className={`font-semibold ${
                          done
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {step.desc}
                      </p>

                    </div>

                  </motion.div>

                )

              })}

            </div>

          )}

        </div>

      </section>

    </div>

  );

};

export default TrackOrder;