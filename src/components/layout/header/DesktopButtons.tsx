import Image from 'next/image';

export default function DesktopButtons() {
  return (
    <div className="gap-4 hidden tablet:flex">
      <button className="w-[50] h-[50] rounded-[15] bg-headerMain flex flex-col items-center justify-center gap-[5]">
        <Image src="/assets/category.svg" alt="shopping" width={12} height={12} />
        <p className="font-medium text-[10px] text-[#075985]">카테고리</p>
      </button>
      <button className="w-[50] h-[50] rounded-[15] bg-headerMain flex flex-col items-center justify-center gap-[5]">
        <Image src="/assets/shopping.svg" alt="shopping" width={12} height={12} />
        <p className="font-medium text-[10px] text-[#075985]">장바구니</p>
      </button>
    </div>
  );
}
