'use client';

import { CheckIcon } from '@heroicons/react/24/outline';

type Props = {
  checked: boolean;
  handleChangeCheck: () => void;
};

/**
 * 체크박스 컴포넌트
 *
 * @param {boolean} checked - 가격
 * @function handleChangeCheck - 체크박스 클릭시 실행할 함수
 */
export default function Checkbox({ checked, handleChangeCheck }: Props) {
  return (
    <div
      className={`w-[18px] h-[18px] flex items-center justify-center rounded-sm border cursor-pointer border-blue-300 ${checked ? 'bg-blue-300' : 'bg-white'}`}
      onClick={handleChangeCheck}
    >
      <CheckIcon className={`w-[14px] h-[14px] ${checked ? 'text-white' : 'text-blue-300'}`} />
    </div>
  );
}
