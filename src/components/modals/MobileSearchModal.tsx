'use client';

import Image from 'next/image';
import { SearchOverview, SearchForm } from '../common';
import React, { useRef } from 'react';
import SearchIcon from '../common/SearchIcon';

type Props = {
  handleClose: () => void;
};

export default function MobileSearchModal({ handleClose }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <article className="w-full h-screen fixed z-[300] top-0 left-0 bg-black bg-opacity-30">
      <div ref={parentRef} className="w-full bg-white">
        <div className="w-full px-4 py-[15px] flex items-center">
          <Image src="/assets/arrow.svg" alt="back" width={24} height={24} onClick={handleClose} />
          <SearchForm
            ref={formRef}
            classname="ml-5 text-sm grow placeholder:text-[#5B5B5B] outline-none"
            handleCloseSearchView={handleClose}
          />
          <SearchIcon onClick={() => formRef.current?.requestSubmit()} />
        </div>
        <SearchOverview parentRef={parentRef} recommend={['추천']} handleClose={handleClose} />
      </div>
    </article>
  );
}
