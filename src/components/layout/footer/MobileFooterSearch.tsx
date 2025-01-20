'use client';

import MobileSearchModal from '@/components/modals/MobileSearchModal';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function MobileFooterSearch() {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-col items-center" onClick={() => setIsSearch(true)}>
        <MagnifyingGlassIcon className="w-[35px] h-[35px] text-[#075985]" />
        <p>검색</p>
      </div>
      {isSearch && <MobileSearchModal handleClose={() => setIsSearch(false)} />}
    </>
  );
}
