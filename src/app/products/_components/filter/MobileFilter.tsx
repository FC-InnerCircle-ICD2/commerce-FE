'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/20/solid';
import { NoSymbolIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

import { PriceRange, FilterProps } from '../../../../types/product';

import { MobileSelectedOptionTag } from '@/app/products/_components/filter/SelectedOptionTag';
import { PriceFilter } from '@/app/products/_components/filter/PriceFilter';
import { RatingFilter } from '@/app/products/_components/filter/RatingFilter';

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const priceRangeValues = useMemo(() => {
    const prices = products.map((product) => product.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }, [products]);

  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | undefined>(() => {
    const minParam = searchParams?.get('priceMin');
    const maxParam = searchParams?.get('priceMax');
    if (minParam || maxParam) {
      return {
        min: minParam ? Number(minParam) : priceRangeValues.min,
        max: maxParam ? Number(maxParam) : priceRangeValues.max,
      };
    }
    return undefined;
  });

  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: priceRangeValues.min,
    max: priceRangeValues.max,
  });

  const [sliderValue, setSliderValue] = useState<number[]>(() => {
    const minParam = searchParams?.get('priceMin');
    const maxParam = searchParams?.get('priceMax');
    return [minParam ? Number(minParam) : priceRangeValues.min, maxParam ? Number(maxParam) : priceRangeValues.max];
  });

  const [selectedRating, setSelectedRating] = useState<number | null>(() => {
    const rating = searchParams?.get('rating');
    return rating ? Number(rating) : null;
  });

  useEffect(() => {
    const minParam = searchParams?.get('priceMin');
    const maxParam = searchParams?.get('priceMax');
    const ratingParam = searchParams?.get('rating');

    const newMin = minParam ? Number(minParam) : priceRangeValues.min;
    const newMax = maxParam ? Number(maxParam) : priceRangeValues.max;

    setPriceRange({ min: newMin, max: newMax });
    setSliderValue([newMin, newMax]);

    if (minParam || maxParam) {
      setSelectedPriceRange({ min: newMin, max: newMax });
    } else {
      setSelectedPriceRange(undefined);
    }

    if (ratingParam) {
      setSelectedRating(Number(ratingParam));
    } else {
      setSelectedRating(null);
    }
  }, [searchParams, priceRangeValues]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    setPriceRange({ min: value[0], max: value[1] });
  };

  const handleInputChange = (type: 'min' | 'max', value: number) => {
    if (type === 'min') {
      setPriceRange((prev) => ({ ...prev, min: value }));
      setSliderValue((prev) => [value, prev[1]]);
    } else {
      setPriceRange((prev) => ({ ...prev, max: value }));
      setSliderValue((prev) => [prev[0], value]);
    }
  };

  const handlePriceSearch = () => {
    const params = new URLSearchParams(searchParams?.toString() || '');

    if (priceRange.min !== priceRangeValues.min) {
      params.set('priceMin', priceRange.min.toString());
    } else {
      params.delete('priceMin');
    }

    if (priceRange.max !== priceRangeValues.max) {
      params.set('priceMax', priceRange.max.toString());
    } else {
      params.delete('priceMax');
    }

    router.push(`?${params.toString()}`);
    setSelectedPriceRange(priceRange);
  };

  const handleRemoveRating = () => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.delete('rating');
    router.push(`?${params.toString()}`);
    setSelectedRating(null);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.delete('priceMin');
    params.delete('priceMax');
    params.delete('rating');
    params.set('pageNumber', '0');
    router.push(`?${params.toString()}`);

    setSelectedPriceRange(undefined);
    setPriceRange({ min: priceRangeValues.min, max: priceRangeValues.max });
    setSliderValue([priceRangeValues.min, priceRangeValues.max]);
    setSelectedRating(null);
  };

  const hasProducts = products.length > 0;

  return (
    <Drawer>
      <div className="flex items-center gap-3">
        <DrawerTrigger asChild>
          <button className="lg:hidden border border-slate-300 rounded-full bg-white px-2 py-2">
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </button>
        </DrawerTrigger>
        <div className="flex items-center gap-3 flex-1 justify-between">
          <MobileSelectedOptionTag
            priceRange={selectedPriceRange}
            onPriceRangeRemove={() => {
              setSelectedPriceRange(undefined);
              setPriceRange({ min: priceRangeValues.min, max: priceRangeValues.max });
              setSliderValue([priceRangeValues.min, priceRangeValues.max]);
              const params = new URLSearchParams(searchParams?.toString() || '');
              params.delete('priceMin');
              params.delete('priceMax');
              router.push(`?${params.toString()}`);
            }}
            selectedRating={selectedRating}
            onRatingRemove={handleRemoveRating}
            global
          />
          {hasProducts && (selectedPriceRange || selectedRating) && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 whitespace-nowrap"
            >
              <ArrowPathIcon className="h-4 w-4" />
              초기화
            </button>
          )}
        </div>
      </div>

      <DrawerContent>
        <div className="mx-auto w-full">
          <DrawerHeader>
            <div className="px-4 flex items-center justify-between">
              <DrawerTitle>필터</DrawerTitle>
              {hasProducts && (
                <button
                  onClick={handleReset}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <ArrowPathIcon className="h-4 w-4" />
                  초기화
                </button>
              )}
            </div>
          </DrawerHeader>
          {!hasProducts ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <NoSymbolIcon className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-base font-medium text-slate-600 text-center">필터를 적용할 상품이 없습니다</p>
              <p className="text-sm text-slate-400 mt-1 text-center">다른 검색어로 다시 시도해보세요</p>
            </div>
          ) : (
            <div className="px-4 z-10">
              <RatingFilter />
              <PriceFilter
                priceRange={priceRange}
                sliderValue={sliderValue}
                priceRangeValues={priceRangeValues}
                onSliderChange={handleSliderChange}
                onInputChange={handleInputChange}
                onSearch={handlePriceSearch}
              />
            </div>
          )}
          <MobileSelectedOptionTag
            priceRange={selectedPriceRange}
            onPriceRangeRemove={() => {
              setSelectedPriceRange(undefined);
              setPriceRange({ min: priceRangeValues.min, max: priceRangeValues.max });
              setSliderValue([priceRangeValues.min, priceRangeValues.max]);
              const params = new URLSearchParams(searchParams?.toString() || '');
              params.delete('priceMin');
              params.delete('priceMax');
              router.push(`?${params.toString()}`);
            }}
            selectedRating={selectedRating}
            onRatingRemove={handleRemoveRating}
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
