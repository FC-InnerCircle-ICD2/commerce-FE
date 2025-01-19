import PREPARING from '@/assets/preparing.png';

export default function NoneCard() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full h-auto aspect-square max-w-full border-[3px] border-neutral-300 flex items-center justify-center flex-col gap-3 rounded-2xl">
        <img src={PREPARING.src} alt="preparing" className="w-[80px] h-[80px]" />
        <div className="text-xs text-neutral-300">상품 준비중</div>
      </div>
      <div className="font-medium text-neutral-400 text-center">더 많은 상품을 준비 중입니다!</div>
    </div>
  );
}
