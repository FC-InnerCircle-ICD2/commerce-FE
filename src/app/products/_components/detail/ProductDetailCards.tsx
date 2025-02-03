'use client';

import { Card } from '@/components/common';
import { useProducts } from '@/hooks/queries/useProducts';

export default function ProductDegtailCards() {
  const { products } = useProducts({});
  return (
    <div className="w-full relative">
      <h3 className="text-left ml-10 max-sm:ml-0 text-sm md:text-base font-medium mb-4">이런 상품 어때요?</h3>
      <div className="flex">
        {products?.map((product) => (
          <Card
            key={product.productId}
            imgUrl={product.options[0].optionDetails[0].url}
            title={product.name}
            price={product.price}
            review={product.rating}
          />
        ))}
      </div>
    </div>
  );
}
