'use client';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const Header = () => {
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0)
  );

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">Zoop</span>
        </Link>
        <nav>
          <Link href="/cart">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative text-lg  flex flex-row cursor-pointer"
            >
              <ShoppingBag />
              Cart
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-2 -right-6 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-sm"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </motion.div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
