import { IProduct } from '@/api/product';

type Props = {
  product: IProduct;
  handleChangeCheckList: (product: IProduct) => void;
};

export default function CartList({ product, handleChangeCheckList }: Props) {
  return (
    <div className="w-full bg-pink-200 py-[10px] rounded-lg shadow-md" onClick={() => handleChangeCheckList(product)}>
      {product.name}
    </div>
  );
}
