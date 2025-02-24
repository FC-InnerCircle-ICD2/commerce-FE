import { postReviews } from '@/api/product';
import { useMutation } from '@tanstack/react-query';

export function useReviewAddMutate() {
  const { mutate: reviewMutate } = useMutation({
    mutationKey: ['addReview'],
    mutationFn: postReviews,
    onSuccess: (data) => {
      console.log('success : ' + data);
    },
    onError: (e) => {
      console.log('asd');
      console.error(e);
    },
  });

  return { reviewMutate };
}
