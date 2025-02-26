import { IProductDetail } from '@/api/product';
import { Header } from '@/components/layout';
import { BASE_URL } from '@/constants/constant';
import ReviewForm from './_components/ReviewForm';

async function getProduct(productId: string): Promise<IProductDetail> {
  const response = await fetch(`${BASE_URL}api/v1/products/${productId}`);
  // const response = await fetch('http://3.38.23.68:8080/api/v1/products/8562570505');
  if (!response.ok) {
    throw new Error('상품 정보를 불러오는데 실패했습니다.');
  }
  return response.json();
}

export default async function Review({
  searchParams,
}: {
  searchParams: Promise<{ orderId: string; productId: string }>;
}) {
  const { orderId, productId } = await searchParams;
  const product = await getProduct(productId);

  return (
    <>
      <Header />
      <div className="max-w-custom mx-auto w-full flex flex-col px-3 pt-8 tablet:px-[150px]">
        <h1 className="font-bold text-2xl border-b border-slate-300 pb-3">리뷰 등록하기</h1>
        <ReviewForm orderId={orderId} product={product} />
      </div>
    </>
  );
}
