'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '@/redux/cartSlice';
import { RootState } from '@/redux/store';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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
  const outOfStock = (cartItem?.quantity ?? 0) >= 10;
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ duration: 0.3 }}
      className="relative h-[26rem] overflow-hidden rounded-xl border border-gray-200 bg-white dark:bg-gray-900 shadow-md"
    >
      {/* Stock Indicator */}
      {(cartItem?.quantity ?? 0) < 10 ? (
        <Badge className="absolute z-10 top-2 left-2 bg-green-500 text-white">
          In Stock
        </Badge>
      ) : (
        <Badge className="absolute z-10 top-2 left-2 bg-red-500 text-white">
          Out of Stock
        </Badge>
      )}

      <Card className="h-full flex flex-col">
        <CardContent className="p-4 flex-grow">
          <Link href={`/product/${product.id}`} className="block relative h-48">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="relative h-full"
            >
              <Image
                src={product.image || '/placeholder.svg'}
                alt={product.title}
                layout="fill"
                objectFit="contain"
                className="rounded-lg transition-transform duration-300"
              />
            </motion.div>
          </Link>

          <h2 className="text-lg font-semibold mt-4 line-clamp-2">
            {product.title}
          </h2>
          <p className="text-sm text-gray-500">{product.category}</p>

          {/* Price Display */}
          <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
        </CardContent>

        {/* Cart Button & Quantity Controls */}
        <CardFooter>
          {cartItem ? (
            <div className="flex items-center space-x-2">
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
                disabled={outOfStock}
                variant="outline"
                className="w-10 h-10 flex items-center justify-center"
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleAddToCart}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Add to Cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
