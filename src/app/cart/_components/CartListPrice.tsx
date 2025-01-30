import { IProduct } from '@/api/product';

type Props = {
  product: IProduct;
};

export default function CartListPrice({ product }: Props) {
  return (
    <div className="grow flex items-end gap-[20px] justify-between flex-col p-[20px] border-l tablet:h-full tablet:items-center tablet:border-l-0">
      <div className="flex gap-[3px] w-full justify-between tablet:flex-col tablet:items-center">
        <h1 className="text-xs font-bold">상품금액</h1>
        <p className="text-sm font-bold">{product.price}원</p>
      </div>
      <button className="text-xs border border-blue-300 py-[4px] px-[8px] rounded-sm font-semibold text-blue-500">
        주문하기
      </button>
    </div>
  );
}
