import Image from 'next/image';
import { CategorySearch } from '../common';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="w-screen">
      <Navbar />
      <div className="w-full justify-between flex items-center py-10 tablet:px-[100] shadow-[inset_0px_4px_6px_rgba(0,0,0,0.1)]">
        <div className="flex gap-10 w-full">
          <Image src="/assets/desktopLogo.svg" alt="logo" width={186} height={64} />
          <CategorySearch />
        </div>
        <div className="flex gap-4">
          <button className="w-[70] h-[70] rounded-[15] bg-[#F5F8FB] flex flex-col items-center justify-center gap-[5]">
            <Image src="/assets/category.svg" alt="shopping" width={24} height={24} />
            <p className="font-medium text-xs text-[#075985]">카테고리</p>
          </button>
          <button className="w-[70] h-[70] rounded-[15] bg-[#F5F8FB] flex flex-col items-center justify-center gap-[5]">
            <Image src="/assets/shopping.svg" alt="shopping" width={24} height={24} />
            <p className="font-medium text-xs text-[#075985]">장바구니</p>
          </button>
        </div>
      </div>
    </header>
  );
}
