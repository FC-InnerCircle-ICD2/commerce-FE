import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import { PriceRange } from '@/types/product';

interface PriceFilterProps {
  priceRange: PriceRange;
  sliderValue: number[];
  products: { price: number }[];
  onSliderChange: (value: number[]) => void;
  onInputChange: (type: 'min' | 'max', value: number) => void;
  onSearch: () => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  priceRange,
  sliderValue,
  products,
  onSliderChange,
  onInputChange,
  onSearch,
}) => {
  return (
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
};
