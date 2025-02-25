import { PriceRange } from '@/types/product';
import { COLOR_MAPPING } from '@/app/products/_components/filter/constants';
import { StarIcon as StarEmptyIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarFilledIcon } from '@heroicons/react/24/solid';

interface SelectedOptionTagProps {
  priceRange?: PriceRange;
  onPriceRangeRemove?: () => void;
  selectedColors?: string[];
  onColorRemove?: (color: string) => void;
  selectedRating?: number | null;
  onRatingRemove?: () => void;
  global?: boolean;
}

export const SelectedOptionTag = ({
  priceRange,
  onPriceRangeRemove,
  selectedColors,
  onColorRemove,
  selectedRating,
  onRatingRemove,
}: SelectedOptionTagProps) => {
  const hasSelectedOptions = priceRange || (selectedColors && selectedColors.length > 0) || selectedRating;

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
          {selectedRating && (
            <span className="flex items-center gap-4 w-fit bg-slate-500 py-2 px-3 rounded-full">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => {
                  const StarComponent = index < selectedRating ? StarFilledIcon : StarEmptyIcon;
                  return <StarComponent key={index} className="h-4 w-4 text-white" />;
                })}
              </div>
              <span className="text-sm font-semibold text-white">{selectedRating}점 이상</span>
              <button onClick={onRatingRemove} className="text-md text-white">
                ✕
              </button>
            </span>
          )}
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
  selectedRating,
  onRatingRemove,
  global,
}: SelectedOptionTagProps) => {
  const hasSelectedOptions = priceRange || (selectedColors && selectedColors.length > 0) || selectedRating;

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
        {selectedRating && (
          <span className="flex items-center gap-4 w-fit bg-slate-500 py-2 px-3 rounded-full">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => {
                const StarComponent = index < selectedRating ? StarFilledIcon : StarEmptyIcon;
                return <StarComponent key={index} className="h-4 w-4 text-white" />;
              })}
            </div>
            <span className="text-sm font-semibold text-white">{selectedRating}점 이상</span>
            <button onClick={onRatingRemove} className="text-md text-white">
              ✕
            </button>
          </span>
        )}
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
          <button onClick={onPriceRangeRemove} className="text-md text-gray-400">
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
          <button onClick={() => onColorRemove?.(color)} className="text-md text-gray-400">
            ✕
          </button>
        </span>
      ))}
      {selectedRating && (
        <span className="flex items-center gap-4 w-fit bg-white py-2 px-3 rounded-full">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
              const StarComponent = index < selectedRating ? StarFilledIcon : StarEmptyIcon;
              return <StarComponent key={index} className="h-4 w-4 text-yellow-400" />;
            })}
          </div>
          <span className="text-sm font-semibold">{selectedRating}점 이상</span>
          <button onClick={onRatingRemove} className="text-md text-gray-400">
            ✕
          </button>
        </span>
      )}
    </div>
  );
};
