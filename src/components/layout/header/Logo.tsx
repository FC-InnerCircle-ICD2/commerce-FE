import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="relative w-[73] h-[28] tablet:w-[124] tablet:h-[51]">
      <Image src="/assets/desktopLogo.svg" alt="logo" fill />
    </Link>
  );
}
