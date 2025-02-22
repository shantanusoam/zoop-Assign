'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types';
import ProductCard from './ProductCard';
import FilterSidebar from './FilterSidebar';
import SortDropdown from './SortDropdown';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Menu } from 'lucide-react';

interface ProductListingProps {
  initialProducts: Product[];
}

export default function ProductListing({
  initialProducts,
}: ProductListingProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    let result = products;

    if (selectedCategory) {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    switch (sortOption) {
      case 'priceLowToHigh':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'nameAZ':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameZA':
        result = [...result].sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortOption]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {isMobile && (
        <Button onClick={toggleSidebar} className="md:hidden mb-4">
          <Menu className="mr-2 h-4 w-4" /> Filters
        </Button>
      )}
      <FilterSidebar
        products={products}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isMobile={isMobile}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1">
        <div className="mb-4 flex justify-end">
          <SortDropdown value={sortOption} onChange={setSortOption} />
        </div>
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard key={product.id} product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
