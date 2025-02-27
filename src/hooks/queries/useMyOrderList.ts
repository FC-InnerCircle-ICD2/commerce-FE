import { getMyOrderList, type MyOrderProps } from '@/api/order';
import { useQuery } from '@tanstack/react-query';

export function useMyOrderList(props: MyOrderProps) {
  return useQuery({
    queryKey: ['myOrders', props.page, props.size, props.sort], // 페이지네이션에 맞춰 queryKey 설정
    queryFn: () => getMyOrderList(props),
    placeholderData: true, // 이전 페이지 데이터 유지 (페이지 전환 시 깜빡임 방지)
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시된 데이터를 유지
  });
}
