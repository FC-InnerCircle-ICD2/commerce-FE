import { getProducts, type ProductsProps } from '@/api/product';
import { ProductsQueryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useProducts(props: ProductsProps) {
  const { data: products } = useQuery({
    queryKey: [
      ProductsQueryKeys.products,
      props.productId,
      props.categoryId,
      props.keyword,
      props.priceMin,
      props.priceMax,
      props.sortOption,
      props.pageSize,
      props.pageNumber,
    ],
    queryFn: () => getProducts(props),
  });

  return { products };
}
