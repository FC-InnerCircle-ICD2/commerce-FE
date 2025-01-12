'use client';

import Image from 'next/image';
import Selectbox, { IOptions } from './Selectbox';
import { useState } from 'react';

export default function CategorySearch() {
  const typeOption: IOptions[] = [
    { label: '전체', value: 'All' },
    { label: '셔츠', value: 'shirts' },
    { label: '음식', value: 'foods' },
  ];
  const [currentItem, setCurrentItem] = useState<IOptions>(typeOption[0]);

  return (
    <div className="grow max-w-[550] h-[50] pr-2 py-1 bg-[#F1F5F9] rounded-lg hidden items-center mobile:flex">
      <Selectbox width="100" currentItem={currentItem} items={typeOption} handleChangeSelect={setCurrentItem} />
      <input
        type="text"
        placeholder="찾고 싶은 상품을 검색해 보세요!"
        className="border-l-2 border-[#CBD5E1] pl-[30] text-[#5B5B5B] grow bg-transparent outline-none"
      />
      <div className="bg-white rounded-full w-[40] h-[40] drop-shadow-md flex items-center justify-center">
        <Image src="/assets/search.svg" alt="search" width={25} height={25} />
      </div>
    </div>
  );
}
