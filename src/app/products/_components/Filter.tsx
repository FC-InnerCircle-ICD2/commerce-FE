'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { mockProducts } from './mockData';
import { PriceRange, FilterProps } from '../../../types/product';
import { Slider } from '@/components/ui/slider';

const ALLOWED_FILTERS = ['Color'];

const COLOR_MAPPING: Record<string, string> = {
  'Natural Titanium': '#E3D5C9',
  'Blue Titanium': '#4B688A',
  'Phantom Black': '#000000',
  Cream: '#F5E6D3',
  'Space Gray': '#4A4A4A',
  Silver: '#E3E4E5',
};

interface SelectedOptionTagProps {
  priceRange?: PriceRange;
  onPriceRangeRemove?: () => void;
  selectedColors?: string[];
  onColorRemove?: (color: string) => void;
}

const SelectedOptionTag: React.FC<SelectedOptionTagProps> = ({
  priceRange,
  onPriceRangeRemove,
  selectedColors,
  onColorRemove,
}) => {
  const hasSelectedOptions = priceRange || (selectedColors && selectedColors.length > 0);

  if (!hasSelectedOptions) return null;

  return (
    <>
      <div className="space-y-4 mt-4">
        <h3 className="font-medium">선택된 옵션</h3>
        <div className="flex flex-col gap-3">
          {priceRange && (
            <span className="flex items-center gap-4 w-fit bg-slate-500 py-2 px-3 rounded-full">
              <span className="text-sm text-white font-bold">
                {priceRange.min}원 ~ {priceRange.max}원
              </span>
              <button onClick={onPriceRangeRemove} className="text-md text-white">
                ✕
              </button>
            </span>
          )}
          {selectedColors?.map((color) => (
            <div key={color} className="flex items-center gap-2">
              <div
                className="w-[15px] h-[15px] rounded-[3px]"
                style={{ backgroundColor: COLOR_MAPPING[color] || '#CCCCCC' }}
              />
              <span className="text-sm text-gray-600">{color}</span>
              <button onClick={() => onColorRemove?.(color)} className="text-xs text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-8" />
    </>
  );
};

const PriceFilter: React.FC<{
  priceRange: PriceRange;
  sliderValue: number[];
  products: unknown[];
  onSliderChange: (value: number[]) => void;
  onInputChange: (type: 'min' | 'max', value: number) => void;
  onSearch: () => void;
}> = ({ priceRange, sliderValue, products, onSliderChange, onInputChange, onSearch }) => (
  <div className="space-y-4 mt-4">
    <h3 className="font-medium">가격</h3>
    <div className="bg-white p-5 rounded-lg border border-zinc-300">
      <Slider
        defaultValue={[priceRange.min, priceRange.max]}
        value={sliderValue}
        onValueChange={onSliderChange}
        min={Math.min(...products.map((p) => p.price))}
        max={Math.max(...products.map((p) => p.price))}
        step={1000}
      />
      <div className="flex justify-between text-sm mt-4 text-zinc-300">
        <span>{priceRange.min}</span>
        <span>{priceRange.max}</span>
      </div>
    </div>
    <div className="flex gap-2 items-center">
      <input
        type="number"
        value={priceRange.min}
        className="w-2/5 p-2 border border-zinc-300 rounded text-sm"
        onChange={(e) => onInputChange('min', Number(e.target.value))}
      />
      <span className="text-neutral-500">~</span>
      <input
        type="number"
        value={priceRange.max}
        className="w-2/5 p-2 border border-zinc-300 rounded text-sm"
        onChange={(e) => onInputChange('max', Number(e.target.value))}
      />
      <button
        onClick={onSearch}
        className="bg-slate-500 rounded-lg w-9 h-9 flex items-center justify-center cursor-pointer"
      >
        <Image src="/assets/search.png" alt="검색 아이콘" width={25} height={25} />
      </button>
    </div>
  </div>
);

const ColorFilter: React.FC<{
  values: Set<string>;
  selectedColors: string[];
  onColorSelect: (color: string) => void;
}> = ({ values, selectedColors, onColorSelect }) => (
  <div className="mt-6">
    <h3 className="font-medium mb-3">색상</h3>
    <div className="inline-grid gap-3">
      {Array.from(values).map((value) => (
        <button key={value} onClick={() => onColorSelect(value)} className="flex items-center gap-4" title={value}>
          <div
            className={`w-[20px] h-[20px] rounded-[5px] border cursor-pointer
              ${
                selectedColors.includes(value)
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
);

const Filter: React.FC<FilterProps> = ({ products = mockProducts }) => {
  const [priceRange, setPriceRange] = useState<PriceRange>(() => ({
    min: Math.min(...products.map((p) => p.price)),
    max: Math.max(...products.map((p) => p.price)),
  }));
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | undefined>(undefined);
  const [availableOptions, setAvailableOptions] = useState<Record<string, Set<string>>>({});
  const [sliderValue, setSliderValue] = useState([priceRange.min, priceRange.max]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  useEffect(() => {
    const optionsMap: Record<string, Set<string>> = {};
    products.forEach((product) => {
      product.options.forEach((option) => {
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

  const handlePriceSearch = () => setSelectedPriceRange(priceRange);
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    setPriceRange({ min: value[0], max: value[1] });
  };
  const handleInputChange = (type: 'min' | 'max', value: number) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    setSliderValue([newPriceRange.min, newPriceRange.max]);
  };
  const handleColorSelect = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
  };

  return (
    <div className="w-full max-w-xs rounded-lg p-7">
      <h2 className="text-lg font-bold mb-5">필터</h2>
      <hr />

      <SelectedOptionTag
        priceRange={selectedPriceRange}
        onPriceRangeRemove={() => setSelectedPriceRange(undefined)}
        selectedColors={selectedColors}
        onColorRemove={handleColorSelect}
      />

      <PriceFilter
        priceRange={priceRange}
        sliderValue={sliderValue}
        products={products}
        onSliderChange={handleSliderChange}
        onInputChange={handleInputChange}
        onSearch={handlePriceSearch}
      />

      <hr className="my-8" />

      {Object.entries(availableOptions).map(([optionName, values]) => (
        <ColorFilter
          key={optionName}
          values={values}
          selectedColors={selectedColors}
          onColorSelect={handleColorSelect}
        />
      ))}
    </div>
  );
};

export default Filter;
