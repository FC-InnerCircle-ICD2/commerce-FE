import { IProduct } from '@/api/product';

type Props = {
  product: IProduct;
};

export default function CartListPrice({ product }: Props) {
  return (
    <div className="grow h-full flex items-center justify-between flex-col p-[20px]">
      <div className="flex flex-col gap-[3px]">
        <h1 className="text-xs font-bold">상품금액</h1>
        <p className="text-sm font-bold">{product.price}원</p>
      </div>
      <button className="text-xs border border-blue-300 py-[4px] px-[8px] rounded-sm font-semibold text-blue-500">
        주문하기
      </button>
    </div>
  );
}
