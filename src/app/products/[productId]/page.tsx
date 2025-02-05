import { BASE_URL } from '@/constants/constant';
import { Header } from '@/components/layout';
import { IProduct } from '@/api/product';
import ProductDetailClient from '../_components/detail/ProductDetailClient';

async function getProduct(productId: string): Promise<IProduct> {
  const response = await fetch(`${BASE_URL}api/v1/products/${productId}`);
  // const response = await fetch('http://3.38.23.68:8080/api/v1/products/8562570505');
  if (!response.ok) {
    throw new Error('상품 정보를 불러오는데 실패했습니다.');
  }
  return response.json();
}

export default async function ProductDetail({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = await getProduct(productId);

  return (
    <>
      <Header />
      <ProductDetailClient product={product} />
    </>
  );
}
