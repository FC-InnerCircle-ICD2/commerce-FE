import { getCarts } from '@/api/cart';
import { CartQueryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useCart() {
  const { data: carts, isLoading: cartsLoading } = useQuery({
    queryKey: [CartQueryKeys.carts],
    queryFn: getCarts,
    refetchOnMount: true,
  });

  return { carts, cartsLoading };
}
