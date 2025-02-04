export default function PurchaseBanner() {
  return (
    <div className="flex items-center justify-center lg:justify-between w-full h-[90px] lg:h-[120px] bg-white shadow-[0_-20px_30px_rgba(0,0,0,0.25)] px-[16px] lg:px-[100px]">
      <span className="hidden lg:block text-lg text-zinc-500">
        약관 및 주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
      </span>
      <button className="w-[360px] h-[60px] lg:h-[80px] rounded-[10px] bg-slate-300 text-sky-950 font-bold lg:text-xl">
        86,700원 주문하기
      </button>
    </div>
  );
}
