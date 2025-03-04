export default function CartSkeleton() {
  return (
    <div className="w-full bg-white p-[20px] pb-[10px] rounded-lg shadow-md flex flex-col animate-pulse">
      {/* 상단 바 (제공업체 이름 & 체크박스) */}
      <nav className="w-full pb-[10px] border-b-2 border-black text-xl font-bold flex items-center gap-2">
        <div className="block tablet:hidden w-5 h-5 bg-gray-300 rounded"></div>
        <div className="h-6 w-32 bg-gray-300 rounded"></div>
      </nav>

      {/* 상품 정보, 옵션, 가격 */}
      <div className="w-full flex flex-wrap border-b border-slate-300 tablet:flex-row">
        <div className="w-full border-b border-gray-300 p-[20px] flex gap-[4px] tablet:w-1/2 tablet:border-b-0 tablet:border-r">
          <div className="w-[80px] h-[80px] bg-gray-300 rounded-md"></div>
          <div className="flex flex-col gap-[3px]">
            <div className="w-32 h-5 bg-gray-300 rounded"></div>
            <div className="w-24 h-5 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="w-1/2 border-gray-300 flex flex-col tablet:w-1/5 tablet:h-full tablet:border-r tablet:p-[10px]">
          <div className="h-6 w-24 bg-gray-300 rounded mb-2"></div>
          <div className="h-5 w-32 bg-gray-300 rounded"></div>
          <div className="h-6 w-24 bg-gray-300 rounded mt-4"></div>
          <div className="flex gap-2 items-center mt-2">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="grow flex items-end gap-[20px] justify-between flex-col p-[20px] border-l tablet:h-full tablet:items-center tablet:border-l-0">
          <div className="w-full h-6 bg-gray-300 rounded"></div>
          <div className="w-16 h-6 bg-gray-300 rounded"></div>
          <div className="w-24 h-8 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* 주문 정보 */}
      <footer className="w-full py-[10px] items-center justify-center tablet:flex animate-pulse">
        <div className="w-full flex flex-wrap justify-center gap-2 items-center border-slate-400 tablet:w-[50%] tablet:border-r tablet:gap-[20px]">
          <div className="text-center flex w-full justify-between items-center tablet:block tablet:w-auto">
            <div className="w-24 h-5 bg-gray-300 rounded"></div>
            <div className="w-16 h-5 bg-gray-300 rounded"></div>
          </div>
          <div className="text-[40px] hidden tablet:block">+</div>
          <div className="text-center flex w-full justify-between items-center tablet:block tablet:w-auto">
            <div className="w-24 h-5 bg-gray-300 rounded"></div>
            <div className="w-16 h-5 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="flex grow justify-between mt-2 items-center tablet:justify-center tablet:gap-[10px] tablet:mt-0">
          <div className="w-24 h-5 bg-gray-300 rounded"></div>
          <div className="w-16 h-5 bg-gray-300 rounded"></div>
        </div>
      </footer>
    </div>
  );
}
