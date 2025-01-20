'use client';

import MobileSearchModal from '@/components/modals/MobileSearchModal';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchButton() {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  return (
    <>
      <div
        className="grow h-10 bg-headerMain rounded-lg flex items-center px-[10] tablet:hidden"
        onClick={() => setIsSearch(true)}
      >
        <p className="grow text-xs text-[#5B5B5B]">찾고 싶은 상품을 검색해 보세요!</p>
        <MagnifyingGlassIcon className="w-6 h-6 text-[#075985] p-1 rounded-lg bg-headerMain" />
      </div>
      {isSearch && <MobileSearchModal handleClose={() => setIsSearch(false)} />}
    </>
  );
}
