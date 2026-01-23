import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FilterPanel } from "@/components/product/FilterPanel";
import { useFilter } from "@/hooks/useFilter";
import { mockProducts } from "@/data/mockProducts";

const Products = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { filters, filteredProducts, updateFilter, resetFilters, filteredCount, totalProducts } = useFilter(mockProducts);

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
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container">
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

            {/* Mobile Filters */}
            {showFilters && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-foreground/50" onClick={() => setShowFilters(false)} />
                <motion.div
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  className="absolute left-0 top-0 bottom-0 w-80 bg-background overflow-auto"
                >
                  <FilterPanel
                    filters={filters}
                    updateFilter={updateFilter}
                    resetFilters={resetFilters}
                    filteredCount={filteredCount}
                    totalProducts={totalProducts}
                    onClose={() => setShowFilters(false)}
                  />
                </motion.div>
              </div>
            )}

            {/* Products */}
            <div className="flex-1">
              <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
