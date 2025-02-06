import { IProductDetail } from '@/api/product';
import type { ISelectOptionDetail } from './ProductDetailClient';

type Props = {
  product: IProductDetail;
  seletedOptionDetail: ISelectOptionDetail;
  handleOptionCount: (option: ISelectOptionDetail, flag: boolean) => void;
  handleRemoveOption: (option: ISelectOptionDetail) => void;
};

export default function ProductDetailSelectOptions({
  product,
  seletedOptionDetail,
  handleOptionCount,
  handleRemoveOption,
}: Props) {
  return (
    <div className="border rounded-lg p-4 bg-[#FFFFFF]">
      <div className="flex justify-between items-center mb-2">
        <span className="text-md font-semibold">{seletedOptionDetail.value}</span>
        <button className="text-gray-500" onClick={() => handleRemoveOption(seletedOptionDetail)}>
          ✕
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center rounded-lg overflow-hidden">
          <button
            className="px-4 py-2 border rounded-2xl text-[#CCCCCC]"
            onClick={() => handleOptionCount(seletedOptionDetail, false)}
          >
            -
          </button>
          <span className="px-6 py-2 text-lg">{seletedOptionDetail.count}</span>
          <button
            className="px-4 py-2 border rounded-2xl text-[#CCCCCC]"
            onClick={() => handleOptionCount(seletedOptionDetail, true)}
          >
            +
          </button>
        </div>
        <span className="text-lg font-semibold">{(product.price * seletedOptionDetail.count).toLocaleString()} 원</span>
      </div>
    </div>
  );
}
