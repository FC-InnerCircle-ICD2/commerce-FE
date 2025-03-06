'use client';
import Image from 'next/image';
import Link from 'next/link';
import MobileFooterSearch from './MobileFooterSearch';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

export default function MobileFooter() {
  const pathname = usePathname();
  const isExcluded = pathname === '/postcode';

  if (isExcluded) return null;

  return (
    <footer className="w-full py-[10px] px-[25px] fixed bottom-0 left-0 z-50 bg-white flex justify-between shadow-md text-[#075985] text-[10px] tablet:hidden">
      <Link href="/" className="flex flex-col items-center">
        <Image src="/assets/home.svg" alt="home" width={35} height={35} />
        <p>홈</p>
      </Link>
      <Link href="/category" className="flex flex-col items-center">
        <Image src="/assets/category.svg" alt="category" width={35} height={35} />
        <p>카테고리</p>
      </Link>
      <MobileFooterSearch />
      <Link href="/cart" className="flex flex-col items-center">
        <ShoppingCartIcon className="w-[35px] h-[35px] text-[#075985]" />
        <p>장바구니</p>
      </Link>
    </footer>
  );
}
