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

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="lg:hidden border border-slate-300 rounded-full bg-white px-2 py-2">
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>필터</DrawerTitle>
          </DrawerHeader>

          <div className="px-4 relative z-10">
            <PriceFilter
              priceRange={priceRange}
              sliderValue={sliderValue}
              priceRangeValues={priceRangeValues}
              onSliderChange={handleSliderChange}
              onInputChange={handleInputChange}
              onSearch={handlePriceSearch}
            />

            <div className="my-8 border-t" />

            <div className={`${selectedColors.length > 0 || selectedPriceRange ? 'mb-24' : ''}`}>
              {Object.entries(availableOptions).map(([optionName, values]) => (
                <ColorFilter
                  key={optionName}
                  values={values}
                  selectedColors={selectedColors}
                  onColorSelect={handleColorSelect}
                />
              ))}
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 w-screen top-72">
              <MobileSelectedOptionTag
                priceRange={selectedPriceRange}
                onPriceRangeRemove={() => setSelectedPriceRange(undefined)}
                selectedColors={selectedColors}
                onColorRemove={(color) => setSelectedColors((prev) => prev.filter((c) => c !== color))}
              />
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <button>적용하기</button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
