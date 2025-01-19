import { useState, useEffect } from 'react';
import { ALLOWED_FILTERS } from '@/app/products/_components/filter/constants';
import { Product } from '@/types/product';

export const useFilterOptions = (products: Product[]) => {
  const [availableOptions, setAvailableOptions] = useState<Record<string, Set<string>>>({});

  useEffect(() => {
    const optionsMap: Record<string, Set<string>> = {};
    products.forEach((product) => {
      product.options.forEach((option) => {
        if (ALLOWED_FILTERS.includes(option.name)) {
          if (!optionsMap[option.name]) {
            optionsMap[option.name] = new Set();
          }
          optionsMap[option.name].add(option.value);
        }
      });
    });
    setAvailableOptions(optionsMap);
  }, [products]);

  return availableOptions;
};
