import Image from 'next/image';

export default function SearchButton() {
  return (
    <div className="grow h-10 bg-headerMain rounded-lg flex items-center px-[10] tablet:hidden">
      <p className="grow text-xs text-[#5B5B5B]">찾고 싶은 상품을 검색해 보세요!</p>
      <Image src="/assets/search.svg" alt="search" width={24} height={24} className="p-1 rounded-lg bg-headerMain" />
    </div>
  );
}
