'use client';

import Image from 'next/image';
import Selectbox, { IOptions } from './Selectbox';
import { useState } from 'react';
import SearchForm from './searchForm/SearchForm';
import SearchInput from './SearchInput';

export default function CategorySearch() {
  const typeOption: IOptions[] = [
    { label: '전체', value: 'All' },
    { label: '셔츠', value: 'shirts' },
    { label: '음식', value: 'foods' },
  ];
  const [currentItem, setCurrentItem] = useState<IOptions>(typeOption[0]);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <div className="grow max-w-[550] text-sm h-[50] py-1 bg-headerMain rounded-lg hidden items-center tablet:flex tablet:relative">
      <Selectbox width="140" currentItem={currentItem} items={typeOption} handleChangeSelect={setCurrentItem} />
      <div className="relative flex grow pr-[10]" onFocus={() => setIsFocus(true)}>
        <SearchInput classname="grow border-l-2 border-[#CBD5E1] pl-[15] text-[#3D3D3D] bg-transparent outline-none" />
        <Image src="/assets/search.svg" alt="search" width={25} height={25} />
        {isFocus && (
          <article className="absolute z-50 left-0 top-[50] w-full bg-white rounded-md shadow-md">
            <SearchForm recommend={['추천']} handleClose={() => setIsFocus(false)} />
          </article>
        )}
      </div>
    </div>
  );
}
