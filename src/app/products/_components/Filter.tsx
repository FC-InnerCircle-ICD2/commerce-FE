'use client';

interface PriceRange {
  min: number;
  max: number;
}

interface FilterProps {
  selectedPrice?: PriceRange;
  onPriceChange: (range: PriceRange) => void;
  onRatingChange: (value: boolean) => void;
  onColorSelect: (color: string) => void;
  selectedColors: string[];
}

import React, { useState } from 'react';

const Filter: React.FC<FilterProps> = ({
  selectedPrice,
  onPriceChange,
  onRatingChange,
  onColorSelect,
  selectedColors,
}) => {
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 500, max: 50000 });

  const priceOptions = [
    { label: '5,000원 이하', value: 'under-5000' },
    { label: '5,000원 ~ 5만원', value: '5000-50000' },
    { label: '5만원 ~ 10만원', value: '50000-100000' },
    { label: '10만원 이상', value: 'over-100000' },
  ];

  const colorOptions = [
    { label: '블랙', value: 'black', color: '#000000' },
    { label: '그레이', value: 'gray', color: '#808080' },
    { label: '화이트', value: 'white', color: '#FFFFFF' },
    { label: '레드', value: 'red', color: '#FF0000' },
    { label: '브라운', value: 'brown', color: '#964B00' },
    { label: '오렌지', value: 'orange', color: '#FFA500' },
    { label: '옐로우', value: 'yellow', color: '#FFFF00' },
    { label: '그린', value: 'green', color: '#008000' },
    { label: '블루', value: 'blue', color: '#0000FF' },
    { label: '네이비', value: 'navy', color: '#000080' },
    { label: '퍼플', value: 'purple', color: '#800080' },
  ];

  return (
    <div className="w-full max-w-xs bg-white rounded-lg p-4">
      <div className="space-y-6">
        {/* 선택된 옵션 */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">선택된 옵션</h3>
          <div className="flex gap-2 flex-wrap">
            {selectedPrice && (
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2">
                {`${selectedPrice.min}원 ~ ${selectedPrice.max}원`}
                <button className="text-gray-500">&times;</button>
              </span>
            )}
          </div>
        </div>

        {/* 공통 */}
        <div className="space-y-2">
          <h3 className="font-medium">공통</h3>
          <label className="flex items-center gap-2">
            <input type="checkbox" onChange={(e) => onRatingChange(e.target.checked)} className="rounded" />
            <span>★ 4.5 이상</span>
          </label>
        </div>

        {/* 가격 슬라이더 */}
        <div className="space-y-4">
          <h3 className="font-medium">가격</h3>
          {/* <Slider
            range
            min={200}
            max={97000}
            defaultValue={[priceRange.min, priceRange.max]}
            onChange={(values: number[]) => {
              setPriceRange({ min: values[0], max: values[1] });
              onPriceChange({ min: values[0], max: values[1] });
            }}
          /> */}
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={priceRange.min}
              className="w-24 p-2 border rounded"
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
            />
            <span>~</span>
            <input
              type="number"
              value={priceRange.max}
              className="w-24 p-2 border rounded"
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
            />
          </div>
        </div>

        {/* 색상 선택 */}
        <div className="space-y-2">
          <h3 className="font-medium">색상</h3>
          <div className="grid grid-cols-6 gap-2">
            {colorOptions.map((color) => (
              <button
                key={color.value}
                onClick={() => onColorSelect(color.value)}
                className={`w-8 h-8 rounded-lg border ${
                  selectedColors?.includes(color.value) ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{ backgroundColor: color.color }}
                title={color.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
