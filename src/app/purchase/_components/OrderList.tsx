import type { OrderOption } from '@/api/order';
import { numberFormatting } from '@/utils/numberFormatting';
import type { SelectedOption } from './OrderContents';

interface OptionListProps {
  productOptions: SelectedOption[];
  productPrice: number;
}

export default function OrderList(props: OptionListProps) {
  const { productOptions, productPrice } = props;

  const getOptionName = (selectOption: SelectedOption) => {
    return selectOption.options.map((detail) => `${detail.optionName} / ${detail.value}`).join(' | ');
  };

  const getOptionTotalPrice = (selectOption: SelectedOption) => {
    return selectOption.options.reduce((acc, cur) => acc + cur.additionalPrice, 0);
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
                {getOptionName(product)} | {product.count}개
              </span>
            </div>
          </div>
          <div className="flex justify-end w-full lg:w-auto">
            <span className="font-semibold text-sm">
              {numberFormatting(productPrice + getOptionTotalPrice(product))}원
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
