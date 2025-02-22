'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '@/redux/cartSlice';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncrement = (id: number) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex items-center">
                <div className="relative w-20 h-20 mr-4">
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <div>
                  <Link href={`/product/${item.id}`}>
                    <span className="text-lg font-semibold">{item.title}</span>
                  </Link>
                  <p className="text-sm text-gray-600">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button onClick={() => handleDecrement(item.id)}>-</Button>
                <span>{item.quantity}</span>
                <Button onClick={() => handleIncrement(item.id)}>+</Button>
                <Button
                  onClick={() => handleRemove(item.id)}
                  variant="destructive"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-8">
            <h2 className="text-2xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h2>
            <Button className="mt-4">Proceed to Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}
