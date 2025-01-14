import Image from 'next/image';
import Link from 'next/link';

export default function MobileFooter() {
  return (
    <footer className="w-full py-[10] px-[25] flex justify-between shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.25)] text-[#075985] text-[10px] tablet:hidden">
      <Link href="/" className="flex flex-col items-center">
        <Image src="/assets/home.svg" alt="home" width={35} height={35} />
        <p>홈</p>
      </Link>
      <Link href="/category" className="flex flex-col items-center">
        <Image src="/assets/category.svg" alt="category" width={35} height={35} />
        <p>카테고리</p>
      </Link>
      <div className="flex flex-col items-center">
        <Image src="/assets/search.svg" alt="search" width={35} height={35} />
        <p>검색</p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/assets/shopping.svg" alt="shopping" width={35} height={35} />
        <p>장바구니</p>
      </div>
      <div className="flex flex-col items-center">
        <Image src="/assets/user.svg" alt="user" width={30} height={30} />
        <p>마이</p>
      </div>
    </footer>
  );
}
