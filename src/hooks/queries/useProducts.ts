import { getProducts, type ProductsProps } from '@/api/product';
import { ProductsQueryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';

export function useProducts(props: ProductsProps) {
  const { data: products } = useQuery({
    queryKey: [ProductsQueryKeys.products, props.name, props.productCategoryId, props.rating, props.size, props.sort],
    queryFn: () => getProducts(props),
  });

  return { products };
}
