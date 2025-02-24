'use client';

import React, { useState, useMemo, useEffect } from 'react';

import { PriceRange, FilterProps } from '../../../../types/product';
import { useRouter, useSearchParams } from 'next/navigation';

import { SelectedOptionTag } from '@/app/products/_components/filter/SelectedOptionTag';
import { PriceFilter } from '@/app/products/_components/filter/PriceFilter';
import { RatingFilter } from '@/app/products/_components/filter/RatingFilter';
import { ArrowPathIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const Filter: React.FC<FilterProps> = ({ products }) => {
  const searchParams = useSearchParams();
  const categoryId = searchParams?.get('categoryId');

  const priceRangeValues = useMemo(() => {
    const price = products.map((p) => p.price).filter((price): price is number => price !== undefined && !isNaN(price));

    if (price.length === 0) {
      return { min: 0, max: 0 };
    }

    return {
      min: Math.min(...price),
      max: Math.max(...price),
    };
  }, [categoryId]);

  const [priceRange, setPriceRange] = useState<PriceRange>(() => {
    const minParam = searchParams?.get('priceMin');
    const maxParam = searchParams?.get('priceMax');
    return {
      min: minParam ? Number(minParam) : priceRangeValues.min,
      max: maxParam ? Number(maxParam) : priceRangeValues.max,
    };
  });
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
  const [selectedRating, setSelectedRating] = useState<number | null>(() => {
    const ratingParam = searchParams?.get('rating');
    return ratingParam ? Number(ratingParam) : null;
  });
  const [sliderValue, setSliderValue] = useState(() => {
    const minParam = searchParams?.get('priceMin');
    const maxParam = searchParams?.get('priceMax');
    return [minParam ? Number(minParam) : priceRangeValues.min, maxParam ? Number(maxParam) : priceRangeValues.max];
  });
  const router = useRouter();

  useEffect(() => {
    const minParam = searchParams?.get('priceMin');
    const maxParam = searchParams?.get('priceMax');

    const newMin = minParam ? Number(minParam) : priceRangeValues.min;
    const newMax = maxParam ? Number(maxParam) : priceRangeValues.max;

    setPriceRange({ min: newMin, max: newMax });
    setSliderValue([newMin, newMax]);

    if (minParam || maxParam) {
      setSelectedPriceRange({ min: newMin, max: newMax });
    } else {
      setSelectedPriceRange(undefined);
    }
  }, [searchParams, priceRangeValues]);

  useEffect(() => {
    const ratingParam = searchParams?.get('rating');
    setSelectedRating(ratingParam ? Number(ratingParam) : null);
  }, [searchParams]);

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

    params.set('pageNumber', '0');
    router.push(`/products?${params.toString()}`);
    setSelectedPriceRange(priceRange);
  };
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    setPriceRange({ min: value[0], max: value[1] });
  };
  const handleInputChange = (type: 'min' | 'max', value: number) => {
    const newPriceRange = { ...priceRange, [type]: value };
    setPriceRange(newPriceRange);
    setSliderValue([newPriceRange.min, newPriceRange.max]);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.delete('priceMin');
    params.delete('priceMax');
    params.delete('rating');
    router.push(`?${params.toString()}`);
    setSelectedPriceRange(undefined);
    setSelectedRating(null);
  };

  const hasProducts = products.length > 0;

  return (
    <div className="w-full max-w-xs rounded-lg p-7">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold">필터</h2>
        <button
          onClick={handleReset}
          className={`text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 ${!hasProducts && 'opacity-50 cursor-not-allowed'}`}
          disabled={!hasProducts}
        >
          <ArrowPathIcon className="h-4 w-4" />
          초기화
        </button>
      </div>
      <hr />

      {!hasProducts ? (
        <div className="flex flex-col items-center justify-center py-10 text-slate-500">
          <AdjustmentsHorizontalIcon className="w-10 h-10 mb-3" />
          <p className="text-sm text-center">필터를 적용할 상품이 없습니다</p>
        </div>
      ) : (
        <>
          <SelectedOptionTag
            priceRange={selectedPriceRange}
            onPriceRangeRemove={() => {
              const params = new URLSearchParams(searchParams?.toString() || '');
              params.delete('priceMin');
              params.delete('priceMax');
              router.push(`/products?${params.toString()}`);
              setSelectedPriceRange(undefined);
            }}
            selectedRating={selectedRating}
            onRatingRemove={() => {
              const params = new URLSearchParams(searchParams?.toString() || '');
              params.delete('rating');
              router.push(`/products?${params.toString()}`);
              setSelectedRating(null);
            }}
          />
          <RatingFilter />
          <hr className="my-8" />
          <PriceFilter
            priceRange={priceRange}
            sliderValue={sliderValue}
            priceRangeValues={priceRangeValues}
            onSliderChange={handleSliderChange}
            onInputChange={handleInputChange}
            onSearch={handlePriceSearch}
          />
        </>
      )}
    </div>
  );
};

export default Filter;
