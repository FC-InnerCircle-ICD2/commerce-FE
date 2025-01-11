import Image from 'next/image';

export default function CategorySearch() {
  return (
    <div className="grow max-w-[550] pl-5 pr-2 py-1 bg-[#F1F5F9] rounded-full hidden items-center mobile:flex">
      <div className="w-[100]">전체</div>
      <input
        type="text"
        placeholder="찾고 싶은 상품을 검색해 보세요!"
        className="border-l-1 pl-[30] text-[#5B5B5B] grow bg-transparent outline-none"
      />
      <div className="bg-white rounded-full w-[50] h-[50] drop-shadow-md flex items-center justify-center">
        <Image src="/assets/search.svg" alt="search" width={30} height={30} />
      </div>
    </div>
  );
}
