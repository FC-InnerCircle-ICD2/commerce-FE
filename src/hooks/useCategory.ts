import { getCategory } from '@/api/category';
import { CategoryQueryKeys } from '@/utils/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useCategory() {
  const { data: categories } = useQuery({
    queryKey: [CategoryQueryKeys.category],
    queryFn: getCategory,
  });

  return { categories };
}
