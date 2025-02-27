import { getReview } from '@/api/review';
import { useQuery } from '@tanstack/react-query';

export function useReview(productId: number) {
  const { data: reviews } = useQuery({
    queryKey: ['review'],
    queryFn: () => getReview(productId),
  });

  return { reviews };
}
