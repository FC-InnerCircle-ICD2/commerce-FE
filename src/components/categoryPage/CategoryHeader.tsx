import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function CategoryHeader() {
  return (
    <header className="w-full h-[60] flex justify-between items-center px-4 shadow-md">
      <div className="flex gap-5">
        <Link href="/">
          <Image src="/assets/arrow.svg" width={24} height={24} alt="arrow" />
        </Link>
        <span className="font-bold">카테고리</span>
      </div>
      <div className="flex gap-[15]">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#F6F8FB]">
          <MagnifyingGlassIcon className="w-[30px] h-[30px] text-[#075985]" />
        </div>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#F6F8FB]">
          <ShoppingCartIcon className="w-[30px] h-[30px] text-[#075985]" />
        </div>
      </div>
    </header>
  );
}
