import { IProduct } from '@/api/product';

type Props = {
  product: IProduct;
};

export default function CartListOptions({ product }: Props) {
  return (
    <div className="w-1/2 border-gray-300 flex flex-col tablet:w-1/5 tablet:h-full tablet:border-r tablet:p-[10px]">
      <h1 className="text-sm font-bold px-[4px] py-[10px]">상품 옵션</h1>
      <ul className="flex flex-col gap-[20px] px-[4px]">
        {product.options.map((item) => {
          return (
            <li className="flex gap-[2px] text-xs" key={item.id}>
              <p className="font-semibold w-[50px]">{item.name}:</p>
              <p>{item.value}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
