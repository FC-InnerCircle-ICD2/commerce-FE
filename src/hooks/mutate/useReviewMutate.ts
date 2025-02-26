import { postReviews } from '@/api/review';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useReviewAddMutate() {
  const router = useRouter();
  const { mutate: reviewMutate } = useMutation({
    mutationKey: ['addReview'],
    mutationFn: postReviews,
    onSuccess: () => {
      alert('리뷰가 등록되었습니다');
      router.push('/');
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return { reviewMutate };
}
