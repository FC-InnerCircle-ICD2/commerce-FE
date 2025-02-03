import { MOCK_URL } from '@/constants/constant';
import ProductDetailClient from './ProductDetailClient';
import { Header } from '@/components/layout';

interface ProductImage {
  id: number;
  fileOrder: number;
  url: string;
  representative: boolean;
}

interface ProductOptionDetail {
  id: number;
  value: string;
  quantity: number;
  order: number;
  additionalPrice: number;
  images: ProductImage[];
}

interface ProductOption {
  id: number;
  name: string;
  optionDetails: ProductOptionDetail[];
}

interface ProductCategory {
  id: number;
  name: string;
  parentCategoryId: number | null;
  subCategories: ProductCategory[];
}

interface ProductProvider {
  id: number;
  name: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  provider: ProductProvider;
  options: ProductOption[];
}

async function getProduct(productId: string): Promise<Product> {
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
