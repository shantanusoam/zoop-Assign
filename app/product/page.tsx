import ProductListing from '@/components/ProductListing';
import { getProducts } from '@/lib/api';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Listing</h1>
      <ProductListing initialProducts={products} />
    </main>
  );
}
