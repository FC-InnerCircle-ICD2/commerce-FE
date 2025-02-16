import { IProductOptionDetail, IProductOptions } from '@/api/product';
import { useEffect, useState } from 'react';

type Props = {
  options: IProductOptions[];
  handleAddOptionDetail: (options: IProductOptionDetail[]) => void;
};

export default function ProdudctDetailClientOptions({ options, handleAddOptionDetail }: Props) {
  const [selectOption, setSelectOption] = useState<IProductOptionDetail[]>([]);

  const handleAddDetail = (detail: IProductOptionDetail) => {
    const find = selectOption.find((item) => item.id === detail.id);
    if (find) {
      setSelectOption([...selectOption.filter((item) => item.id !== detail.id), detail]);
    } else {
      setSelectOption([...selectOption, detail]);
    }
  };

  useEffect(() => {
    if (selectOption.length === options.length) {
      handleAddOptionDetail(selectOption);
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
                className="px-4 py-2 border rounded-full border-gray-400 text-sm hover:bg-slate-500 hover:text-white"
                onClick={() => handleAddDetail(detail)}
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
