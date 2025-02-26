import { postAddCarts, postChangeCartQuantity } from '@/api/cart';
import { CartQueryKeys } from '@/constants/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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

export function useCartChangeQuantityMutate() {
  const queryClient = useQueryClient();

  const { mutate: changeCartQuantityMutate } = useMutation({
    mutationKey: ['changeCartQuantity'],
    mutationFn: postChangeCartQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CartQueryKeys.carts],
      });
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return { changeCartQuantityMutate };
}
