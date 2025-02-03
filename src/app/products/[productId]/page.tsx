import { MOCK_URL } from '@/constants/constant';
import ProductDetailClient from './ProductDetailClient';
import { Header } from '@/components/layout';
import { IProduct } from '@/api/product';

async function getProduct(productId: string): Promise<IProduct> {
  const response = await fetch(`${MOCK_URL}/v1/products/${productId}`);
  if (!response.ok) {
    throw new Error('상품 정보를 불러오는데 실패했습니다.');
  }
  return response.json();
}

export default async function ProductDetail({ params }: { params: { productId: string } }) {
  const product = await getProduct(params.productId);

  return (
    <>
      <Header />
      <ProductDetailClient product={product} />
    </>
  );
}
