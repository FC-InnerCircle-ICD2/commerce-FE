import Image from 'next/image';

export default function Logo() {
  return (
    <div className="relative w-[80] h-[30] tablet:w-[130] tablet:h-[50]">
      <Image src="/assets/desktopLogo.svg" alt="logo" fill />
    </div>
  );
}
