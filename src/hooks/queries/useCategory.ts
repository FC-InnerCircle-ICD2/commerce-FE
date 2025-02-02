import { getCategory } from '@/api/category';
import { CategoryQueryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useCategory() {
  const { data: categories, isLoading: categoryLoading } = useQuery({
    queryKey: [CategoryQueryKeys.category],
    queryFn: getCategory,
  });

  return { categories, categoryLoading };
}
