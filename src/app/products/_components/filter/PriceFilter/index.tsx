import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { PriceRange } from '@/types/product';
import React, { useState } from 'react';

interface PriceFilterProps {
  priceRange?: PriceRange;
  selectedPriceRange?: PriceRange | undefined;
  onPriceRangeSelect: (min: number, max: number) => void;
  onInputChange: (type: 'min' | 'max', value: number) => void;
  onSearch: () => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  onPriceRangeSelect,
  onInputChange,
  onSearch,
  priceRange,
}) => {
  const searchParams = useSearchParams();
  const [minInput, setMinInput] = useState<string>('');
  const [maxInput, setMaxInput] = useState<string>('');

  const priceRanges = [
    { label: '가격 전체', min: 0, max: null },
    { label: '1만원 이하', min: 1, max: 10000 },
    { label: '1만원 ~ 2만원', min: 10000, max: 20000 },
    { label: '2만원 ~ 3만원', min: 20000, max: 30000 },
    { label: '4만원 이상', min: 40000, max: null },
  ];

  const getSelectedRangeIndex = () => {
    const minParam = searchParams?.get('priceMin');
    const maxParam = searchParams?.get('priceMax');

    if (!minParam || !maxParam) return 0;

    const min = Number(minParam);
    const max = Number(maxParam);

    for (let i = 0; i < priceRanges.length; i++) {
      const range = priceRanges[i];
      if (range.min === min && (range.max === max || (i === priceRanges.length - 1 && max >= range.min))) {
        return i;
      }
    }

    return 0;
  };

  const selectedRange = getSelectedRangeIndex();

  const handleRangeClick = (index: number) => {
    const { min, max } = priceRanges[index];
    const maxValue = max === null ? (priceRange?.max ?? 0) : max;
    onPriceRangeSelect(min, maxValue);

    // Reset input fields when a preset range is selected
    setMinInput(min.toString());
    setMaxInput(max ? max.toString() : '');
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers and limit to 1,000,000
    if (/^\d*$/.test(value) && Number(value) <= 1000000) {
      setMinInput(value);

      // Only call onInputChange if the value is a valid number
      if (value !== '') {
        onInputChange('min', Number(value));
      }
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Allow only numbers and limit to 1,000,000
    if (/^\d*$/.test(value) && Number(value) <= 1000000) {
      setMaxInput(value);

      // Only call onInputChange if the value is a valid number
      if (value !== '') {
        onInputChange('max', Number(value));
      }
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <h3 className="font-medium">가격</h3>
      <div className="p-3 rounded-lg border-zinc-300">
        <div className="space-y-2">
          {priceRanges.map((range, index) => (
            <div
              key={range.label}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleRangeClick(index)}
            >
              <span className={`text-sm ${selectedRange === index ? 'text-blue-600' : 'text-gray-600'}`}>
                {range.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 items-center justify-between">
        <input
          type="text"
          value={minInput}
          className="w-2/5 p-2 border border-zinc-300 rounded text-sm"
          onChange={handleMinChange}
        />
        <span className="text-neutral-500">~</span>
        <input
          type="text"
          value={maxInput}
          className="w-2/5 p-2 border border-zinc-300 rounded text-sm"
          onChange={handleMaxChange}
        />
        <button
          onClick={() => {
            onSearch();
          }}
          className="bg-slate-500 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer"
        >
          <Image src="/assets/search.png" alt="검색 아이콘" width={25} height={25} />
        </button>
      </div>
    </div>
  );
};
