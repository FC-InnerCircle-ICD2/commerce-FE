import HeaderLogo from '@/assets/purchase/headerLogo.png';
import ChevronRight from '@/assets/purchase/chevronRight.png';
import OrderContents from './_components/OrderContents';

export default async function Purchase() {
  return (
    <div className="w-[100%] h-auto flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full h-[70px] shadow-[0px_15px_10px_rgba(233,233,233,0.25)] flex justify-between items-center">
        <div className="flex flex-1 items-center ml-[16px] lg:ml-[100px]">
          <img src={HeaderLogo.src} alt="Header Logo" />
        </div>
        <div className="flex flex-1 justify-center items-center text-xl font-medium">주문/결제</div>
        <div className="flex-1 mr-[16px] lg:mr-[100px]"></div>
      </div>

      {/* Navigator */}
      <div className="w-full h-[40px] md:h-[100px] px-[16px] lg:px-[100px] flex items-center flex-row-reverse">
        <div className="hidden md:flex items-center gap-1">
          <span className="text-sm font-medium">주문/결제</span>
          <img src={ChevronRight.src} alt="Expand payment method list" className="w-5 h-5" />
          <span className="text-sm font-light">완료</span>
        </div>
      </div>

      {/* Content */}
      <OrderContents />
    </div>
  );
}
