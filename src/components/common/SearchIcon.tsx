'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type Props = {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
};

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-[25px] h-[25px]',
};

export default function SearchIcon({ onClick, size = 'md' }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center"
    >
      <MagnifyingGlassIcon className={`${sizeMap[size]} text-[#075985] cursor-pointer`} />
    </button>
  );
}
