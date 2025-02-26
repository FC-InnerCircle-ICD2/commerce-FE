import { postAddCarts } from '@/api/cart';
import { useMutation } from '@tanstack/react-query';

export function useCartAddMutate() {
  const { mutate: addCartMutate } = useMutation({
    mutationKey: ['addCarts'],
    mutationFn: postAddCarts,
    onSuccess: () => {
      alert('장바구니에 추가되었습니다');
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return { addCartMutate };
}
