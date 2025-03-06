import { Footer, Header } from '@/components/layout';
import ProductDetailClient from '../_components/detail/ProductDetailClient';
import { getProduct } from '@/api/product';

export default async function ProductDetail({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  try {
    const product = await getProduct(productId);

    return (
      <>
        <Header />
        <ProductDetailClient product={product} />
        <Footer />
      </>
    );
  } catch {
    return <div>상품 정보를 불러오는데 실패했습니다.</div>;
  }
}
