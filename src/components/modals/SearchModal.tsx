'use client';

import Image from 'next/image';
import { SearchForm } from '../common';

type Props = {
  handleClose: () => void;
};

export default function SearchModal({ handleClose }: Props) {
  return (
    <article className="w-full h-screen absolute z-50 top-0 left-0 bg-black bg-opacity-30">
      <div className="w-full bg-white">
        <div className="w-full px-4 py-[15] flex items-center">
          <Image src="/assets/arrow.svg" alt="back" width={24} height={24} onClick={handleClose} />
          <input
            type="text"
            className="ml-5 text-sm grow placeholder:text-[#5B5B5B] outline-none"
            placeholder="찾고 싶은 상품을 검색해보세요!"
          />
          <Image src="/assets/search.svg" alt="back" width={24} height={24} />
        </div>
        <SearchForm recommend={['추천']} handleClose={handleClose} />
      </div>
    </article>
  );
}
