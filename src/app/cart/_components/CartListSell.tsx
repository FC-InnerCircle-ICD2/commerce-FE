import { ICartItem } from '@/api/cart';
import { numberFormatting } from '@/utils/numberFormatting';

type Props = {
  product: ICartItem;
};

export default function CartListSell({ product }: Props) {
  const getTotalAdditionalPrice = (): number => {
    return product.options.reduce((total, option) => {
      return total + option.optionDetail.additionalPrice;
    }, 0);
  };

  return (
    <footer className="w-full py-[10px] items-center justify-center tablet:flex">
      <div className="w-full flex flex-wrap justify-center gap-2 items-center border-slate-400 tablet:w-[50%] tablet:border-r tablet:gap-[20px]">
        <div className="text-center flex w-full justify-between items-center tablet:block tablet:w-auto">
          <h1 className="font-bold text-xs">선택상품금액</h1>
          <h1 className="font-bold">{numberFormatting(product.price)}원</h1>
        </div>
        <div className="text-[40px] hidden tablet:block">+</div>

        <div className="text-center flex w-full justify-between items-center tablet:block tablet:w-auto">
          <h1 className="font-bold text-xs">옵션 금액</h1>
          <h1 className="font-bold text-red-600">{getTotalAdditionalPrice()}원</h1>
        </div>
      </div>
      <div className="flex grow justify-between mt-2 items-center tablet:justify-center tablet:gap-[10px] tablet:mt-0">
        <h1 className="text-sm font-bold">주문 금액</h1>
        <h1 className="font-bold text-blue-600">{numberFormatting(product.subTotalPrice)}원</h1>
      </div>
    </footer>
  );
}
