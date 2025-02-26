import { ICartItem } from '@/api/cart';

type Props = {
  product: ICartItem;
};

export default function CartListOptions({ product }: Props) {
  return (
    <div className="w-1/2 border-gray-300 flex flex-col tablet:w-1/5 tablet:h-full tablet:border-r tablet:p-[10px]">
      <h1 className="text-sm font-bold px-[4px] py-[10px]">상품 옵션</h1>
      <ul className="flex flex-col gap-[20px] px-[4px]">
        <li className="flex gap-[2px] text-xs">
          <p className="font-semibold w-[50px]">{product.option.optionDetail.value}:</p>
        </li>
      </ul>
    </div>
  );
}
