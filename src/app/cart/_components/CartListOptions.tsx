'use client';

import { ICartItem } from '@/api/cart';
import { useCartChangeQuantityMutate } from '@/hooks/mutate/useCartMutate';

type Props = {
  product: ICartItem;
};

export default function CartListOptions({ product }: Props) {
  const { changeCartQuantityMutate } = useCartChangeQuantityMutate();

  function handleMinusButton() {
    if (product.options[0].optionDetail.quantity === 1) return;
    changeCartQuantityMutate({
      itemId: product.itemId,
      optionDetailQuantity: product.options[0].optionDetail.quantity - 1,
    });
  }

  function handlePlusButton() {
    changeCartQuantityMutate({
      itemId: product.itemId,
      optionDetailQuantity: product.options[0].optionDetail.quantity + 1,
    });
  }

  return (
    <div className="w-1/2 border-gray-300 flex flex-col tablet:w-1/5 tablet:h-full tablet:border-r tablet:p-[10px]">
      {product.options.map((option, i) => {
        return (
          <div className="w-full" key={i}>
            <h1 className="text-sm font-bold px-[4px] py-[10px]">상품 옵션</h1>
            <ul className="flex flex-col gap-[20px] px-[4px] w-full">
              <li className="flex gap-[4px] text-xs w-full">
                <h4 className="font-bold">{option.name}: </h4>
                <p className="">{option.optionDetail.value}</p>
              </li>
            </ul>
          </div>
        );
      })}
      <h1 className="text-sm font-bold px-[4px] py-[10px]">개수 추가</h1>
      <div className="flex gap-2 items-center">
        <span className="cursor-pointer" onClick={() => handleMinusButton()}>
          -
        </span>
        <span>{product.options[0].optionDetail.quantity}</span>
        <span className="cursor-pointer" onClick={() => handlePlusButton()}>
          +
        </span>
      </div>
    </div>
  );
}
