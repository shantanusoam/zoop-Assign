'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '@/redux/cartSlice';
import { RootState } from '@/redux/store';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product.id));
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Product Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <Image
              src={product.image || '/placeholder.svg'}
              alt={product.title}
              layout="fill"
              objectFit="contain"
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
        </motion.div>

        {/* Product Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold">{product.title}</h1>

          {/* Stock Status */}
          {(cartItem?.quantity ?? 0) < 10 ? (
            <Badge className="bg-green-500 text-white">In Stock</Badge>
          ) : (
            <Badge className="bg-red-500 text-white">Out of Stock</Badge>
          )}

          <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>

          {/* Cart Controls */}
          {cartItem ? (
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleDecrement}
                variant="outline"
                className="w-10 h-10 flex items-center justify-center"
                disabled={cartItem.quantity === 1}
              >
                -
              </Button>
              <span className="text-lg font-semibold">{cartItem.quantity}</span>
              <Button
                onClick={handleIncrement}
                variant="outline"
                className="w-10 h-10 flex items-center justify-center"
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Add to Cart
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
