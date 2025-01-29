import { IProduct } from '@/api/product';

type Props = {
  product: IProduct;
};

export default function CartListSell({ product }: Props) {
  return (
    <footer className="flex w-full py-[10px] items-center justify-center">
      <div className="w-[50%] flex justify-center items-center gap-[20px] border-r border-slate-400">
        <div className="text-center">
          <h1 className="font-bold text-xs">선택상품금액</h1>
          <h1 className="font-bold">{product.price}원</h1>
        </div>
        <div className="text-[40px]">-</div>
        <div className="text-center">
          <h1 className="font-bold text-xs">즉시할인예상금액</h1>
          <h1 className="font-bold text-red-600">{product.options[0].sellPrice}원</h1>
        </div>
      </div>
      <div className="flex gap-[10px] grow justify-center items-center">
        <h1 className="text-sm font-bold">주문 금액</h1>
        <h1 className="font-bold text-blue-600">{product.price - product.options[0].sellPrice}원</h1>
      </div>
    </footer>
  );
}
