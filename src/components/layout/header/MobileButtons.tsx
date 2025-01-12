import Image from 'next/image';

export default function MobileButtons() {
  return (
    <div className="flex gap-4 tablet:hidden">
      <Image src="/assets/search.svg" alt="search" width={30} height={30} className="p-1 rounded-lg bg-headerMain" />
      <Image
        src="/assets/shopping.svg"
        alt="shopping"
        width={30}
        height={30}
        className="p-1 rounded-lg bg-headerMain"
      />
      <Image src="/assets/user.svg" alt="user" width={30} height={30} className="p-2 rounded-lg bg-headerMain" />
    </div>
  );
}
