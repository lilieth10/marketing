import { ProductDetail } from "@/components/dashboard/product-detail"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return <ProductDetail productId={params.id} />
}
