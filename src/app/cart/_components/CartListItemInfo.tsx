import { ICartItem } from '@/api/cart';
import { numberFormatting } from '@/utils/numberFormatting';

type Props = {
  product: ICartItem;
};

export default function CardListItemInfo({ product }: Props) {
  return (
    <div className="w-full border-b border-gray-300 p-[20px] flex gap-[4px] tablet:w-1/2 tablet:border-b-0 tablet:border-r">
      <img src={product.images.url} alt={product.productName} className="w-[80px] h-[80px]" />
      <div className="flex flex-col justify-between gap-[3px]">
        <div className="flex flex-col gap-[2px]">
          <h1 className="text-wrap font-bold">{product.productName}</h1>
          <p className="text-wrap text-xs font-semibold">{numberFormatting(product.price)}원</p>
        </div>
        <div className="flex text-xs gap-[4px] text-slate-400">{product.provider.name}</div>
      </div>
    </div>
  );
}
