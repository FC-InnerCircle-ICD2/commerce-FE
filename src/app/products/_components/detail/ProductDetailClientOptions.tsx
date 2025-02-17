import { IProductOptionDetail, IProductOptions } from '@/api/product';
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
          <div className="flex space-x-2 mt-2">
            {option.optionDetails.map((detail) => (
              <button
                key={detail.value}
                className={`px-4 py-2 border rounded-full border-gray-400 text-sm ${selectOption.find((item) => item.value === detail.value) && 'bg-slate-500 text-white'} hover:bg-slate-500 hover:text-white`}
                onClick={() => handleAddDetail(option, detail)}
              >
                {detail.value}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
