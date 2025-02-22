import Cart from '@/components/cart';

export default function CartPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <Cart />
    </main>
  );
}
