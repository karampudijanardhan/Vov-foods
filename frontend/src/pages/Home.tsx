import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Truck, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { mockProducts } from "@/data/mockProducts";
import { categories } from "@/data/categories";

import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {

  const [apiProducts,setApiProducts] = useState<any[]>([]);

  useEffect(()=>{

    axios.get("http://localhost:5000/api/products")
    .then(res=>{
      setApiProducts(res.data);
    })
    .catch(()=>{
      console.log("Using mock products fallback");
    });

  },[]);

  const allProducts = apiProducts.length
    ? [...apiProducts, ...mockProducts]
    : mockProducts;

  const newArrivals = allProducts.slice(0,8);

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-warm">

        {/* Background Image */}
        <div
          className="absolute left-0 top-0 w-full lg:w-1/2 h-full bg-cover bg-center opacity-60 saturate-150 pointer-events-none"
          style={{
            backgroundImage:
              "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSidOIadt2T69-SLvJfizMMYzULZKyXSfOWZHMe89zjUy_XZE0hBG-XnjM&s=10')",
          }}
        />

        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-secondary blur-3xl" />
        </div>

        <div className="container relative py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* TEXT AREA */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 text-black text-sm font-semibold shadow">
                <Sparkles className="w-4 h-4" />
                100% Homemade • No Preservatives
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight">
                Authentic <span className="text-red-600">Telugu</span> Flavors,{" "}
                <span className="text-orange-600">Homemade</span> with Love
              </h1>

              <p className="text-lg font-semibold text-black max-w-xl">
                Experience the rich taste of traditional Indian pickles, aromatic spice powders,
                and melt-in-mouth sweets — made with recipes passed down through generations.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="gradient-saffron hover:opacity-90 gap-2">
                    Explore Products
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>

                <Link to="/offers">
                  <Button size="lg" variant="outline" className="gap-2">
                    View Offers
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 pt-6">
                {[
                  { icon: Truck, text: "Free Delivery 599+" },
                  { icon: Shield, text: "Fresh & Safe" },
                  { icon: Heart, text: "Made with Love" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-black">
                    <Icon className="w-5 h-5 text-primary" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

            </motion.div>

            {/* IMAGE SIDE */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 rounded-full gradient-saffron opacity-20 blur-3xl animate-pulse" />

                <div className="relative w-full h-[500px] lg:h-[630px]">
                  <img
                    src="/WhatsApp Image 2026-03-22 at 12.47.39.jpeg"
                    alt="Homemade Indian Pickles"
                    className="w-full h-full object-cover rounded-3xl shadow-2xl"
                  />
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* Categories */}
      <section className="py-16 bg-background">
        <div className="container">

          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collection of traditional delicacies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category,index)=>(
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/category/${category.slug}`}>
                  <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-shadow">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                      <h3 className="font-display text-2xl font-bold mb-1">{category.name}</h3>
                      <p className="text-sm opacity-80 line-clamp-2">{category.description}</p>
                      <p className="text-primary mt-2 font-medium text-sm">
                        {category.productCount} Products →
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* New Arrivals */}
      <section className="py-16 gradient-warm">
        <div className="container">

          <ProductGrid
            products={newArrivals}
            title="New Arrivals"
            description="Discover our latest additions to the menu"
          />

          <div className="text-center mt-8">
            <Link to="/products">
              <Button size="lg" className="gradient-saffron hover:opacity-90 gap-2">
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;