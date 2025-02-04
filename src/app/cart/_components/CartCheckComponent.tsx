import Checkbox from '@/components/common/Checkbox';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
  isAllCheck: boolean;
  handleAllCheckList: () => void;
  handleDeleteCheckList: () => void;
};

export default function CartCheckComponent({ isAllCheck, handleAllCheckList, handleDeleteCheckList }: Props) {
  return (
    <div className="w-full py-4 px-3 flex items-center justify-between tablet:py-[20px] tablet:px-[100]">
      <div className="flex gap-2 items-center">
        <Checkbox checked={isAllCheck} handleChangeCheck={handleAllCheckList} />
        <p className="font-bold text-sm">전체 선택</p>
      </div>
      <button
        className="border px-2 py-1 border-slate-300 text-xs flex items-center gap-1"
        onClick={handleDeleteCheckList}
      >
        <XMarkIcon className="w-[14px] h-[14px text-slate-500" />
        선택 삭제
      </button>
    </div>
  );
}
