'use client';

import { IReviewContent } from '@/api/review';
import { useReview } from '@/hooks/queries/useReview';

type Props = {
  productId: number;
};

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function ReviewList({ review }: { review: IReviewContent }) {
  return (
    <div role="list" className="py-[20px] px-[10px] border-b border-slate-300 last-of-type:border-none">
      <header className="w-full flex gap-2">
        <div className="w-[50px] h-[50px] bg-slate-100 rounded-full"></div>
        <div className="grow flex flex-col">
          <div className="flex items-center">
            {Array.from({ length: review.rating }).map((_, i) => {
              return (
                <span key={i} className="text-yellow-500">
                  ★
                </span>
              );
            })}
            {Array.from({ length: 5 - review.rating }).map((_, i) => {
              return <span key={i}>★</span>;
            })}
            <span className="ml-2 font-semibold text-sm">{review.rating}</span>
          </div>
          <h3 className="text-slate-500 text-sm font-semibold">{formatDate(review.createdAt)}</h3>
          <h3 className="mt-[15px] text-sm font-semibold text-slate-500">옵션: {review.productOptionName}</h3>
          <p className="mt-[5px] text-sm whitespace-pre-line font-medium text-slate-600">{review.content}</p>
        </div>
      </header>
    </div>
  );
}

export default function ProductDetailClientReview({ productId }: Props) {
  const { reviews } = useReview(productId);
  return (
    <ul>
      {(!reviews || reviews.content.length === 0) && (
        <div className="w-full h-[160px] flex items-center justify-center text-xl font-bold">
          등록된 리뷰가 없습니다
        </div>
      )}
      {reviews?.content.map((content) => {
        return <ReviewList key={content.id} review={content} />;
      })}
    </ul>
  );
}
