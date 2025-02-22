import { getProduct } from "@/lib/api"
import ProductDetail from "@/components/ProductDetail"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    return <div>Product not found</div>
  }

  return <ProductDetail product={product} />
}

