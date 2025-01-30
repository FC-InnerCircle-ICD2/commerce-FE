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
      <nav className="w-full pb-[10px] border-b-2 border-black text-xl font-bold flex items-center gap-2">
        <div className="block tablet:hidden">
          <Checkbox
            checked={!!checkList.find((item) => item.productId === product.productId)}
            handleChangeCheck={() => handleChangeCheckList(product)}
          />
        </div>
        {product.provider.name}
      </nav>
      <div className="w-full flex flex-wrap border-b border-slate-300 tablet:flex-row">
        <div className="hidden h-full items-center tablet:flex">
          <Checkbox
            checked={!!checkList.find((item) => item.productId === product.productId)}
            handleChangeCheck={() => handleChangeCheckList(product)}
          />
        </div>
        <CartListItemInfo product={product} />
        <CartListOptions product={product} />
        <CartListPrice product={product} />
      </div>
      <CartListSell product={product} />
    </div>
  );
}
