'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { mockProducts } from './mockData';
import { PriceRange, FilterProps } from '../../../types/product';
import { Slider } from '@/components/ui/slider';

const ALLOWED_FILTERS = ['Color']; // 허용된 필터 옵션

// 색상 매핑 객체 추가
const COLOR_MAPPING: Record<string, string> = {
  'Natural Titanium': '#E3D5C9',
  'Blue Titanium': '#4B688A',
  'Phantom Black': '#000000',
  Cream: '#F5E6D3',
  'Space Gray': '#4A4A4A',
  Silver: '#E3E4E5',
};

const Filter: React.FC<FilterProps> = ({
  products = mockProducts,
  selectedPrice,
  onPriceChange,
  onOptionSelect,
  selectedOptions = {},
}) => {
  const [priceRange, setPriceRange] = useState<PriceRange>(() => {
    const minPrice = Math.min(...products.map((p) => p.price));
    const maxPrice = Math.max(...products.map((p) => p.price));
    return { min: minPrice, max: maxPrice };
  });

  const [availableOptions, setAvailableOptions] = useState<Record<string, Set<string>>>({});

  useEffect(() => {
    const optionsMap: Record<string, Set<string>> = {};

    products.forEach((product) => {
      product.options.forEach((option) => {
        // ALLOWED_FILTERS에 있는 옵션만 필터링
        if (ALLOWED_FILTERS.includes(option.name)) {
          if (!optionsMap[option.name]) {
            optionsMap[option.name] = new Set();
          }
          optionsMap[option.name].add(option.value);
        }
      });
    });

    setAvailableOptions(optionsMap);
  }, [products]);

  // 가격 포맷팅 함수
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <div className="w-full max-w-xs rounded-lg p-7">
      <h2 className="text-lg font-bold mb-5">필터</h2>
      <hr />

      {/* 가격 필터 */}
      <div className="space-y-4 mt-4">
        <h3 className="font-medium">가격</h3>
        <div className="bg-white p-5 rounded-lg">
          <Slider defaultValue={[priceRange.min, priceRange.max]} />
          <div className="flex justify-between text-sm mt-4 text-zinc-300">
            <span>{priceRange.min}</span>
            <span>{priceRange.max}</span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={priceRange.min}
            className="w-2/5 p-2 border rounded text-sm"
            onChange={(e) => {
              const newMin = Number(e.target.value);
              setPriceRange((prev) => ({ ...prev, min: newMin }));
              onPriceChange({ ...priceRange, min: newMin });
            }}
          />
          <span>~</span>
          <input
            type="number"
            value={priceRange.max}
            className="w-2/5 p-2 border rounded text-sm"
            onChange={(e) => {
              const newMax = Number(e.target.value);
              setPriceRange((prev) => ({ ...prev, max: newMax }));
              onPriceChange({ ...priceRange, max: newMax });
            }}
          />
          <div className="bg-slate-500 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer">
            <Image src="/assets/search.png" alt="검색 아이콘" width={25} height={25} />
          </div>
        </div>
      </div>
      <hr className="my-8" />

      {/* 색상 필터 */}
      {Object.entries(availableOptions).map(([optionName, values]) => (
        <div key={optionName} className="mt-6">
          <h3 className="font-medium mb-3">색상</h3>
          <div className="inline-grid gap-3">
            {Array.from(values).map((value) => (
              <button
                key={value}
                onClick={() => onOptionSelect(optionName, value)}
                className="flex items-center gap-4"
                title={value}
              >
                <div
                  className={`w-[20px] h-[20px] rounded-[5px] border cursor-pointer
                    ${
                      selectedOptions[optionName]?.includes(value)
                        ? 'ring-2 ring-blue-500 ring-offset-2'
                        : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'
                    }`}
                  style={{
                    backgroundColor: COLOR_MAPPING[value] || '#CCCCCC',
                    borderColor: value.toLowerCase() === 'white' ? '#E5E7EB' : 'transparent',
                  }}
                />
                <span className="text-sm text-gray-600">{value}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Filter;
