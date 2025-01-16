'use client';

import MobileSearchModal from '@/components/modals/MobileSearchModal';
import Image from 'next/image';
import { useState } from 'react';

export default function SearchButton() {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  return (
    <>
      <div
        className="grow h-10 bg-headerMain rounded-lg flex items-center px-[10] tablet:hidden"
        onClick={() => setIsSearch(true)}
      >
        <p className="grow text-xs text-[#5B5B5B]">찾고 싶은 상품을 검색해 보세요!</p>
        <Image src="/assets/search.svg" alt="search" width={24} height={24} className="p-1 rounded-lg bg-headerMain" />
      </div>
      {isSearch && <MobileSearchModal handleClose={() => setIsSearch(false)} />}
    </>
  );
}
