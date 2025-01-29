import { IProduct } from '@/api/product';

type Props = {
  product: IProduct;
};

export default function CartListOptions({ product }: Props) {
  return (
    <div className="w-[20%] h-full border-r border-gray-300 flex flex-col">
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
