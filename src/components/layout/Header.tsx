import Image from 'next/image';
import { CategorySearch } from '../common';
import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="w-screen">
      <Navbar />
      <div className="w-full py-4 px-3 justify-between flex items-center tablet:py-10 tablet:px-[100] tablet:shadow-[inset_0px_4px_6px_rgba(0,0,0,0.1)]">
        <div className="flex grow gap-10 items-center">
          <div className="relative w-[80] h-[30] tablet:w-[130] tablet:h-[50]">
            <Image src="/assets/desktopLogo.svg" alt="logo" fill />
          </div>
          <CategorySearch />
        </div>
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
        <div className="flex gap-4 tablet:hidden">
          <Image
            src="/assets/search.svg"
            alt="search"
            width={30}
            height={30}
            className="p-1 rounded-lg bg-headerMain"
          />
          <Image
            src="/assets/shopping.svg"
            alt="shopping"
            width={30}
            height={30}
            className="p-1 rounded-lg bg-headerMain"
          />
          <Image src="/assets/user.svg" alt="user" width={30} height={30} className="p-2 rounded-lg bg-headerMain" />
        </div>
      </div>
    </header>
  );
}
