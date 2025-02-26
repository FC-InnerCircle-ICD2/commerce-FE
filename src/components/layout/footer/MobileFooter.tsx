import Image from 'next/image';
import Link from 'next/link';
import MobileFooterSearch from './MobileFooterSearch';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function MobileFooter() {
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
      <div className="flex flex-col items-center">
        <Image src="/assets/user.svg" alt="user" width={30} height={30} />
        <p>마이</p>
      </div>
    </footer>
  );
}
