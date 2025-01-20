import Link from 'next/link';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <nav className="hidden mobile:block top-0 shadow-sm">
      <div className="max-w-custom mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-2">
              <Image src="/assets/paw.svg" alt="서브 로고 이미지" width={10} height={10} />
              <span className="text-xs text-[#A8C4D9]">감성개발자들</span>
            </span>
            <span className="flex items-center gap-2">
              <Image src="/assets/cent.svg" alt="서브 로고 이미지2" width={10} height={10} />
              <span className="text-xs text-neutral-400">Inner Circle</span>
            </span>
          </div>
          <div className="text-xs flex items-center gap-4">
            <span className="flex items-center gap-2">
              <UserCircleIcon className="w-3 h-3 text-[#5F6368]" />
              <span>홍길동 님</span>
            </span>
            <Link href="" className="border rounded-xl border-zinc-300 text-xs text-black px-2 py-1">
              로그아웃
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
