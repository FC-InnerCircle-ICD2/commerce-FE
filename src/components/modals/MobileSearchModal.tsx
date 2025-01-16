'use client';

import Image from 'next/image';
import { SearchForm, SearchInput } from '../common';
import React, { useRef } from 'react';

type Props = {
  handleClose: () => void;
};

export default function MobileSearchModal({ handleClose }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <article className="w-full h-screen absolute z-50 top-0 left-0 bg-black bg-opacity-30">
      <div ref={parentRef} className="w-full bg-white">
        <div className="w-full px-4 py-[15] flex items-center">
          <Image src="/assets/arrow.svg" alt="back" width={24} height={24} onClick={handleClose} />
          <SearchInput classname="ml-5 text-sm grow placeholder:text-[#5B5B5B] outline-none" />
          <Image src="/assets/search.svg" alt="back" width={24} height={24} />
        </div>
        <SearchForm parentRef={parentRef} recommend={['추천']} handleClose={handleClose} />
      </div>
    </article>
  );
}
