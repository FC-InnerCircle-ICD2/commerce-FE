import { IProduct, IProductOptionDetail } from '@/api/product';

type Props = {
  product: IProduct;
  seletedOptionDetail: IProductOptionDetail;
};

export default function ProductDetailSelectOptions({ product, seletedOptionDetail }: Props) {
  return (
    <div className="border rounded-lg p-4 bg-[#FFFFFF]">
      <div className="flex justify-between items-center mb-2">
        <span className="text-md font-semibold">{seletedOptionDetail.value}</span>
        <button className="text-gray-500">✕</button>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center rounded-lg overflow-hidden">
          <button className="px-4 py-2 border rounded-2xl text-[#CCCCCC]">-</button>
          <span className="px-6 py-2 text-lg">1</span>
          <button className="px-4 py-2 border rounded-2xl text-[#CCCCCC]">+</button>
        </div>
        <span className="text-lg font-semibold">{product.price.toLocaleString()} 원</span>
      </div>
    </div>
  );
}
