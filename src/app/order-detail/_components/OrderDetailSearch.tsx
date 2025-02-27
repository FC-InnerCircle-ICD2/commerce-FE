'use client';

export default function OrderDetailSearch() {
  const handleSearch = () => {};

  return (
    <div className="w-full h-[50px] lg:h-[60px] border-t border-slate-300 px-4 lg:px-8 flex items-center justify-between">
      <button className="bg-slate-500 rounded-full w-14 h-8 lg:h-10 text-sm text-white">전체</button>
      <div className="relative w-60 lg:w-72">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-full border border-neutral-300 bg-white rounded-full h-8 lg:h-10 text-sm px-4"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 lg:px-3 lg:py-1"
          onClick={() => {
            handleSearch();
          }}
        >
          🔍
        </button>
      </div>
    </div>
  );
}
