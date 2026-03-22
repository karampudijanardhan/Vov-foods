import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterPanel } from "@/components/product/FilterPanel";
import { useFilter } from "@/hooks/useFilter";
import { mockProducts } from "@/data/mockProducts";

const Products = () => {

  const [showFilters, setShowFilters] = useState(false);

  // Load products from localStorage or data file
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : mockProducts;
  });

  const {
    filters,
    filteredProducts,
    updateFilter,
    resetFilters,
    filteredCount,
    totalProducts
  } = useFilter(products);

  // Save stock changes
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Reduce stock after order
  const reduceStock = (productId: string, quantity: number = 1) => {

    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId && p.stock > 0
          ? { ...p, stock: Math.max(p.stock - quantity, 0) }
          : p
      )
    );

  };

  // Reset stock to original data
  const resetStock = () => {
    localStorage.removeItem("products");
    setProducts(mockProducts);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <section className="gradient-warm py-12">
        <div className="container">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >

            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              All Products
            </h1>

            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our complete collection of homemade pickles, aromatic powders, and traditional sweets.
            </p>

            {/* Reset Stock Button */}
            <div className="mt-4 flex justify-center">
              <Button variant="outline" onClick={resetStock}>
                Reset Stock
              </Button>
            </div>

          </motion.div>

        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container">

          {/* Mobile Filters */}
          <div className="lg:hidden mb-6">

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters ({filteredCount} products)
            </Button>

          </div>

          <div className="flex gap-8">

            {/* Desktop Filters */}
            <aside className="hidden lg:block w-72 shrink-0">

              <FilterPanel
                filters={filters}
                updateFilter={updateFilter}
                resetFilters={resetFilters}
                filteredCount={filteredCount}
                totalProducts={totalProducts}
              />

            </aside>

            {/* Product Grid */}
            <div className="flex-1">

              <ProductGrid
                products={filteredProducts}
                reduceStock={reduceStock}
              />

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default Products;