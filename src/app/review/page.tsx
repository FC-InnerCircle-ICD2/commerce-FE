import { Header } from '@/components/layout';
import ReviewForm from './_components/ReviewForm';
import { getProduct } from '@/api/product';

interface ReviewData {
  productOptions: { productOptionId: number; productOptionName: string }[];
}

export default async function Review({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; productId?: string; reviewData?: string }>;
}) {
  const { orderId, productId, reviewData } = await searchParams;

  let parsedReviewData: ReviewData[] = [];

  if (!orderId || !reviewData || !productId) return <div>not found</div>;
  const product = await getProduct(productId);

  try {
    parsedReviewData = JSON.parse(decodeURIComponent(reviewData));
  } catch (error) {
    console.error('Failed to parse review data:', error);
  }

  return (
    <>
      <Header />
      <div className="max-w-custom mx-auto w-full flex flex-col px-3 pt-8 tablet:px-[150px]">
        <h1 className="font-bold text-2xl border-b border-slate-300 pb-3">리뷰 등록하기</h1>
        <ReviewForm
          orderId={orderId}
          product={product}
          productOptionId={parsedReviewData[0].productOptions[0].productOptionId}
          productOptionName={parsedReviewData[0].productOptions[0].productOptionName}
        />
      </div>
    </>
  );
}
