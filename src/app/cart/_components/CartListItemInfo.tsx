import { IProduct } from '@/api/product';

type Props = {
  product: IProduct;
};

export default function CardListItemInfo({ product }: Props) {
  return (
    <div className="w-[50%] border-r border-gray-300 p-[20px] flex gap-[4px]">
      <img src={product.images[0].url} alt={product.name} width={80} height={80} />
      <div className="flex flex-col justify-between gap-[3px]">
        <div className="flex flex-col gap-[2px]">
          <h1 className="text-wrap font-bold">{product.name}</h1>
          <p className="text-wrap text-xs font-semibold">{product.price}원</p>
        </div>
        <div className="flex text-xs gap-[4px] text-slate-400">
          <p className="pr-[3px] border-r border-slate-400">{product.provider.name}</p>
          <p>{product.provider.description}</p>
        </div>
      </div>
    </div>
  );
}
