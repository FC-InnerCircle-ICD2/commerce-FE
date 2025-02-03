import { useMemo } from 'react';
import { ALLOWED_FILTERS } from '@/app/products/_components/filter/constants';
import { IProduct } from '@/api/product';

export const useFilterOptions = (products: IProduct[]) => {
  const availableOptions = useMemo(() => {
    const optionsMap: Record<string, Set<string>> = {};

    products.forEach((product) => {
      product.options.forEach((option) => {
        if (ALLOWED_FILTERS.includes(option.name)) {
          if (!optionsMap[option.name]) {
            optionsMap[option.name] = new Set();
          }
          option.optionDetails.forEach((detail) => {
            optionsMap[option.name].add(detail.value);
          });
        }
      });
    });

    return optionsMap;
  }, [products]);

  return availableOptions;
};
