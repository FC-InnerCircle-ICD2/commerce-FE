import type { IProduct } from '@/api/product';
import { Card } from '../common';
import NoneCard from '../common/NoneCard';

type Props = {
  products: IProduct[];
};

const MIN_LENGTH = 8;

export default function ProductList({ products }: Props) {
  return (
    <div className="w-full flex flex-col gap-10 px-3 py-5 tablet:py-10 tablet:px-[100] ">
      <div className="text-xl font-bold tablet:text-2xl tablet:text-center">🔥 당신의 일상을 빛낼 핫한 신상품</div>
      <div className="w-full grid grid-cols-2 grid-rows-2 tablet:grid-cols-4 gap-4">
        {products.map((product) => {
          const imgUrl = product.images?.[0]?.url || '/images/default-product.png';
          return (
            <Card
              key={product.productId}
              imgUrl={product.options[0].optionDetails[0].url}
              title={product.name}
              price={product.price}
              review={3}
            />
          );
        })}
        {products.length < MIN_LENGTH &&
          Array.from({ length: MIN_LENGTH - products.length }).map((_, i) => {
            return <NoneCard key={i} />;
          })}
      </div>
    </div>
  );
}
