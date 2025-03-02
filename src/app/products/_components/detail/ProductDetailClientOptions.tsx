import { IProductOptionDetail, IProductOptions } from '@/api/product';
import { numberFormatting } from '@/utils/numberFormatting';
import { useEffect, useState } from 'react';

type Props = {
  options: IProductOptions[];
  handleAddOptionDetail: (options: SelectItem[]) => void;
};

export type SelectItem = {
  id: number;
  detailId: number;
  optionName: string;
  value: string;
  quantity: number;
  additionalPrice: number;
};

export default function ProdudctDetailClientOptions({ options, handleAddOptionDetail }: Props) {
  const [selectOption, setSelectOption] = useState<SelectItem[]>([]);

  const handleAddDetail = (option: IProductOptions, detail: IProductOptionDetail) => {
    const find = selectOption.find((item) => item.id === option.id);
    if (find) {
      setSelectOption([
        ...selectOption.filter((item) => item.id !== option.id),
        {
          optionName: option.name,
          id: option.id,
          detailId: detail.id,
          value: detail.value,
          additionalPrice: detail.additionalPrice,
          quantity: detail.quantity,
        },
      ]);
    } else {
      setSelectOption([
        ...selectOption,
        {
          optionName: option.name,
          id: option.id,
          detailId: detail.id,
          value: detail.value,
          additionalPrice: detail.additionalPrice,
          quantity: detail.quantity,
        },
      ]);
    }
  };

  useEffect(() => {
    if (selectOption.length === options.length) {
      handleAddOptionDetail(selectOption);
      setSelectOption([]);
    }
  }, [selectOption, options, handleAddOptionDetail]);

  return (
    <div>
      {options.map((option) => (
        <div key={option.id} className="mb-4">
          <h3 className="text-md font-semibold">{option.name}</h3>
          <div className="flex flex-wrap items-start gap-2">
            {option.optionDetails.map((detail) => (
              <button
                key={detail.value}
                className={`p-[14px] min-w-[43px] min-h-[27px] border rounded-lg text-slate-500 font-medium border-gray-400 flex flex-col items-center text-sm ${selectOption.find((item) => item.value === detail.value) && 'bg-slate-500 text-white'} hover:bg-slate-500 hover:text-white`}
                onClick={() => handleAddDetail(option, detail)}
              >
                {detail.value}
                {detail.additionalPrice && detail.additionalPrice !== 0 ? (
                  <div className="text-zinc-800 font-medium text-[10px]">
                    +{numberFormatting(detail.additionalPrice)}원
                  </div>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
