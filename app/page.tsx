import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
        Welcome to Our Store
      </h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Discover our curated collection of premium products, from electronics to
        fashion.
      </p>
      <Link href="/product">
        <Button size="lg" className="gap-2">
          <ShoppingBag className="h-5 w-5" />
          Browse Products
        </Button>
      </Link>
    </div>
  );
}
