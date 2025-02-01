import { COLOR_MAPPING } from '@/app/products/_components/filter/constants';

interface ColorFilterProps {
  values: Set<string>;
  selectedColors: string[];
  onColorSelect: (color: string) => void;
}

export const ColorFilter: React.FC<ColorFilterProps> = ({ values, selectedColors, onColorSelect }) => {
  return (
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
};
