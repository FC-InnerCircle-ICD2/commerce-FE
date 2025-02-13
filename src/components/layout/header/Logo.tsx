import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="relative w-[73px] h-[28px] tablet:w-[124px] tablet:h-[51px]">
      <Image src="/assets/desktopLogo.svg" alt="logo" fill />
    </Link>
  );
}
