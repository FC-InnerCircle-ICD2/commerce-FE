import { BASE_URL } from '@/constants/constant';
import { Header } from '@/components/layout';
import { IProductDetail } from '@/api/product';
import ProductDetailClient from '../_components/detail/ProductDetailClient';

// const dummy: IProductDetail = {
//   id: 1,
//   productId: 1,
//   name: '핸드폰',
//   description: '핸드폰 설명',
//   price: 1500000,
//   category: {
//     id: 1,
//     name: '전자제품',
//     parentCategoryId: null,
//     subCategories: [
//       {
//         id: 4,
//         name: '노트북',
//         parentCategoryId: 1,
//         subCategories: [],
//       },
//       {
//         id: 5,
//         name: '스마트폰',
//         parentCategoryId: 1,
//         subCategories: [],
//       },
//       {
//         id: 6,
//         name: '태블릿',
//         parentCategoryId: 1,
//         subCategories: [],
//       },
//     ],
//   },
//   provider: {
//     id: 1,
//     name: 'TechProvider',
//     description: '최고의 기술 제품 제공 업체',
//   },
//   options: [
//     {
//       id: 5,
//       name: '색상',
//       optionDetails: [
//         {
//           id: 8,
//           value: '검정',
//           quantity: 50,
//           order: 1,
//           additionalPrice: 0,
//         },
//         {
//           id: 12,
//           value: '은색',
//           quantity: 30,
//           order: 2,
//           additionalPrice: 10000,
//         },
//       ],
//     },
//     {
//       id: 6,
//       name: '사이즈',
//       optionDetails: [
//         {
//           id: 8,
//           value: 'XS',
//           quantity: 50,
//           order: 1,
//           additionalPrice: 0,
//         },
//         {
//           id: 10,
//           value: 'MD',
//           quantity: 20,
//           order: 2,
//           additionalPrice: 3000,
//         },
//         {
//           id: 12,
//           value: 'LG',
//           quantity: 30,
//           order: 2,
//           additionalPrice: 10000,
//         },
//       ],
//     },
//   ],
//   reviewStatistic: {
//     averageRating: 4.5,
//     reviewCount: 120,
//   },
//   rating: 3,
//   images: [
//     {
//       id: 1,
//       fileOrder: 1,
//       url: 'https://example.com/images/main.png',
//       type: 'MAIN',
//     },
//     {
//       id: 5,
//       fileOrder: 1,
//       url: 'https://example.com/images/datail.png',
//       type: 'DETAIL',
//     },
//   ],
// };
async function getProduct(productId: string): Promise<IProductDetail> {
  const response = await fetch(`${BASE_URL}api/v1/products/${productId}`);
  // const response = await fetch('http://3.38.23.68:8080/api/v1/products/8562570505');
  if (!response.ok) {
    throw new Error('상품 정보를 불러오는데 실패했습니다.');
  }
  return response.json();
}

export default async function ProductDetail({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  try {
    const product = await getProduct(productId);

    return (
      <>
        <Header />
        <ProductDetailClient product={product} />
      </>
    );
  } catch {
    return <div>상품 정보를 불러오는데 실패했습니다.</div>;
  }
}
