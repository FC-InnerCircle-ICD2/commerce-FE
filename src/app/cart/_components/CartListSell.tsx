import { IProduct } from '@/api/product';

type Props = {
  product: IProduct;
};

export default function CartListSell({ product }: Props) {
  return (
    <footer className="w-full py-[10px] items-center justify-center tablet:flex">
      <div className="w-full flex flex-wrap justify-center gap-2 items-center border-slate-400 tablet:w-[50%] tablet:border-r tablet:gap-[20px]">
        <div className="text-center flex w-full justify-between items-center tablet:block tablet:w-auto">
          <h1 className="font-bold text-xs">선택상품금액</h1>
          <h1 className="font-bold">{product.price}원</h1>
        </div>
        <div className="text-[40px] hidden tablet:block">-</div>
        <div className="text-center flex w-full justify-between items-center tablet:block tablet:w-auto">
          <h1 className="font-bold text-xs">즉시할인예상금액</h1>
          <h1 className="font-bold text-red-600">{product.options[0].sellPrice}원</h1>
        </div>
      </div>
      <div className="flex grow justify-between mt-2 items-center tablet:justify-center tablet:gap-[10px] tablet:mt-0">
        <h1 className="text-sm font-bold">주문 금액</h1>
        <h1 className="font-bold text-blue-600">{product.price - product.options[0].sellPrice}원</h1>
      </div>
    </footer>
  );
}
