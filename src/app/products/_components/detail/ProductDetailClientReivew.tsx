'use client';

import { useReview } from '@/hooks/queries/useReview';

type Props = {
  productId: number;
};

export default function ProductDetailClientReview({ productId }: Props) {
  const { reviews } = useReview(productId);
  console.log(reviews);
  return <div>review</div>;
}
