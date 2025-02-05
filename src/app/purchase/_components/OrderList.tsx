import type { OrderOption } from '@/api/order';
import { numberFormatting } from '@/utils/numberFormatting';

interface OptionListProps {
  productOptions: OrderOption[];
}

export default function OrderList(props: OptionListProps) {
  const { productOptions } = props;

  const getOptionName = (product: OrderOption) => {
    return product.options.map((option) => `${option.productOptionName} / ${option.productOptionValue}`).join(' | ');
  };

  return (
    <ul>
      {productOptions.map((product, index) => (
        <li
          key={index}
          className="border border-slate-300 rounded-[10px] bg-white w-full h-auto lg:h-12 p-4 my-[5px] flex items-center justify-between flex-col lg:flex-row"
        >
          <div className="flex items-start lg:items-center w-full lg:w-auto">
            <span className="text-neutral-500 border border-[#c9c9c9] rounded-md bg-white p-1 text-[11px] mr-2.5 w-10 h-6 flex items-center justify-center">
              옵션
            </span>
            <div className="flex justify-between items-center">
              <span className="text-neutral-700 text-sm">
                {getOptionName(product)} | {product.quantity}개
              </span>
            </div>
          </div>
          <div className="flex justify-end w-full lg:w-auto">
            <span className="font-semibold text-sm">{numberFormatting(product.price)}원</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
