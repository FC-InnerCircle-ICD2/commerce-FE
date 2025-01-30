import { IProduct } from '@/api/product';
import CartListItemInfo from './CartListItemInfo';
import CartListOptions from './CartListOptions';
import CartListPrice from './CartListPrice';
import CartListSell from './CartListSell';
import Checkbox from '@/components/common/Checkbox';

type Props = {
  product: IProduct;
  checkList: IProduct[];
  handleChangeCheckList: (product: IProduct) => void;
};

export default function CartList({ product, checkList, handleChangeCheckList }: Props) {
  return (
    <div className="w-full bg-white p-[20px] pb-[10px] rounded-lg shadow-md flex flex-col">
      <nav className="w-full pb-[10px] border-b-2 border-black text-xl font-bold">{product.provider.name}</nav>
      <div className="w-full flex items-center gap-[8px] border-b border-slate-300">
        <Checkbox
          checked={!!checkList.find((item) => item.productId === product.productId)}
          handleChangeCheck={() => handleChangeCheckList(product)}
        />
        <CartListItemInfo product={product} />
        <CartListOptions product={product} />
        <CartListPrice product={product} />
      </div>
      <CartListSell product={product} />
    </div>
  );
}
