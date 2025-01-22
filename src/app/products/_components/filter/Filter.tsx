'use client';

import React, { useState, useMemo } from 'react';

import { PriceRange, FilterProps } from '../../../../types/product';
import { useFilterOptions } from '@/hooks/useFilterOptions';

import { SelectedOptionTag } from '@/app/products/_components/filter/SelectedOptionTag';
import { PriceFilter } from '@/app/products/_components/filter/PriceFilter';
import { ColorFilter } from '@/app/products/_components/filter/ColorFilter';

const Filter: React.FC<FilterProps> = ({ products }) => {
  const priceRangeValues = useMemo(() => {
    const price = products.map((p) => p.price).filter((price): price is number => price !== undefined && !isNaN(price));

    if (price.length === 0) {
      return { min: 0, max: 0 };
    }

    return {
      min: Math.min(...price),
      max: Math.max(...price),
    };
  }, [products]);

  const [priceRange, setPriceRange] = useState<PriceRange>(() => priceRangeValues);
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | undefined>(undefined);
  const availableOptions = useFilterOptions(products);
  const [sliderValue, setSliderValue] = useState([priceRangeValues.min, priceRangeValues.max]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

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
        priceRangeValues={priceRangeValues}
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
