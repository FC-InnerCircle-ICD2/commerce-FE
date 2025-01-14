'use client';

import SearchModal from '@/components/modals/SearchModal';
import Image from 'next/image';
import { useState } from 'react';

export default function MobileFooterSearch() {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-col items-center" onClick={() => setIsSearch(true)}>
        <Image src="/assets/search.svg" alt="search" width={35} height={35} />
        <p>검색</p>
      </div>
      {isSearch && <SearchModal handleClose={() => setIsSearch(false)} />}
    </>
  );
}
