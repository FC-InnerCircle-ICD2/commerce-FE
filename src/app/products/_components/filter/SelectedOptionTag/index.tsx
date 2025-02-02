import { PriceRange } from '@/types/product';
import { COLOR_MAPPING } from '@/app/products/_components/filter/constants';

interface SelectedOptionTagProps {
  priceRange?: PriceRange;
  onPriceRangeRemove?: () => void;
  selectedColors?: string[];
  onColorRemove?: (color: string) => void;
  global?: boolean;
}

export const SelectedOptionTag = ({
  priceRange,
  onPriceRangeRemove,
  selectedColors,
  onColorRemove,
}: SelectedOptionTagProps) => {
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

export const MobileSelectedOptionTag = ({
  priceRange,
  onPriceRangeRemove,
  selectedColors,
  onColorRemove,
  global,
}: SelectedOptionTagProps) => {
  const hasSelectedOptions = priceRange || (selectedColors && selectedColors.length > 0);

  if (!hasSelectedOptions) return null;

  if (global) {
    return (
      <div className="flex flex-wrap gap-2">
        {priceRange && (
          <span className="flex items-center gap-4 w-fit bg-slate-500 py-2 px-3 rounded-full">
            <span className="text-sm font-semibold text-white">
              {priceRange.min}원 ~ {priceRange.max}원
            </span>
            <button onClick={onPriceRangeRemove} className="text-md text-white">
              ✕
            </button>
          </span>
        )}
        {selectedColors?.map((color) => (
          <span key={color} className="flex items-center gap-4 w-fit bg-slate-500 py-2 px-3 rounded-full">
            <div
              className="w-[15px] h-[15px] rounded-[3px]"
              style={{ backgroundColor: COLOR_MAPPING[color] || '#CCCCCC' }}
            />
            <span className="text-sm font-semibold text-white">{color}</span>
            <button onClick={() => onColorRemove?.(color)} className="text-md text-white">
              ✕
            </button>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 bg-gray-100 p-4 mt-10 w-full">
      {priceRange && (
        <span className="flex items-center gap-4 w-fit bg-white py-2 px-3 rounded-full">
          <span className="text-sm font-semibold">
            {priceRange.min}원 ~ {priceRange.max}원
          </span>
          <button onClick={onPriceRangeRemove} className="text-md">
            ✕
          </button>
        </span>
      )}
      {selectedColors?.map((color) => (
        <span key={color} className="flex items-center gap-4 w-fit bg-white py-2 px-3 rounded-full">
          <div
            className="w-[15px] h-[15px] rounded-[3px]"
            style={{ backgroundColor: COLOR_MAPPING[color] || '#CCCCCC' }}
          />
          <span className="text-sm font-semibold">{color}</span>
          <button onClick={() => onColorRemove?.(color)} className="text-md">
            ✕
          </button>
        </span>
      ))}
    </div>
  );
};
