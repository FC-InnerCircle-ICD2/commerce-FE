'use client';

import React, { useState, useMemo } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid';

import { PriceRange, FilterProps } from '../../../../types/product';
import { useFilterOptions } from '@/hooks/useFilterOptions';

import { MobileSelectedOptionTag } from '@/app/products/_components/filter/SelectedOptionTag';
import { PriceFilter } from '@/app/products/_components/filter/PriceFilter';
import { ColorFilter } from '@/app/products/_components/filter/ColorFilter';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

export const MobileFilter: React.FC<FilterProps> = ({ products }) => {
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
  const handleReset = () => {
    setPriceRange(priceRangeValues);
    setSelectedPriceRange(undefined);
    setSliderValue([priceRangeValues.min, priceRangeValues.max]);

    setSelectedColors([]);
  };

  return (
    <Drawer>
      <div className="flex items-center gap-3">
        <DrawerTrigger asChild>
          <button className="lg:hidden border border-slate-300 rounded-full bg-white px-2 py-2">
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </button>
        </DrawerTrigger>
        <MobileSelectedOptionTag
          priceRange={selectedPriceRange}
          onPriceRangeRemove={() => setSelectedPriceRange(undefined)}
          selectedColors={selectedColors}
          onColorRemove={handleColorSelect}
          global
        />
      </div>
      <DrawerContent>
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>

          <div className="px-4 z-10">
            <PriceFilter
              priceRange={priceRange}
              sliderValue={sliderValue}
              priceRangeValues={priceRangeValues}
              onSliderChange={handleSliderChange}
              onInputChange={handleInputChange}
              onSearch={handlePriceSearch}
            />

            <div className="my-8 border-t" />

            {Object.entries(availableOptions).map(([optionName, values]) => (
              <ColorFilter
                key={optionName}
                values={values}
                selectedColors={selectedColors}
                onColorSelect={handleColorSelect}
              />
            ))}
          </div>

          <MobileSelectedOptionTag
            priceRange={selectedPriceRange}
            onPriceRangeRemove={() => setSelectedPriceRange(undefined)}
            selectedColors={selectedColors}
            onColorRemove={(color) => setSelectedColors((prev) => prev.filter((c) => c !== color))}
          />

          <DrawerFooter className="flex gap-2">
            <button onClick={handleReset} className="font-semibold flex-1 text-sm border border-zinc-300 rounded-xl">
              초기화
            </button>
            <DrawerClose asChild className="flex-[4]">
              <button className="!font-semibold w-full text-sm bg-slate-300 py-4 border border-zinc-300 rounded-xl">
                선택된 조건의 상품보기
              </button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
