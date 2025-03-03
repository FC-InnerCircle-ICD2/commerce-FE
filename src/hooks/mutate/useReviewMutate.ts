import { postReviews } from '@/api/review';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useReviewAddMutate() {
  const router = useRouter();
  const { mutate: reviewMutate, isPending: reviewPending } = useMutation({
    mutationKey: ['addReview'],
    mutationFn: postReviews,
    onSuccess: () => {
      alert('리뷰가 등록되었습니다');
      router.push('/');
    },
    onError: (e) => {
      console.error(e);
      alert('리뷰 등록에 실패하였습니다!');
    },
  });

  return { reviewMutate, reviewPending };
}
