'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  products: Product[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({
  products,
  selectedCategory,
  setSelectedCategory,
  isMobile,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );
    setCategories(uniqueCategories);
  }, [products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const sidebarContent = (
    <div className="w-64 bg-white p-4 h-full">
      <h2 className="text-xl font-semibold mb-4">Filter by Category</h2>
      <ScrollArea className="h-[calc(100vh-120px)]">
        {categories.map((category) => (
          <div key={category} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={category}
              checked={selectedCategory === category}
              onCheckedChange={() => handleCategoryChange(category)}
            />
            <label
              htmlFor={category}
              className="text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {category}
            </label>
          </div>
        ))}
      </ScrollArea>
    </div>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 left-0 z-50 shadow-lg"
          >
            {sidebarContent}
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return sidebarContent;
}
