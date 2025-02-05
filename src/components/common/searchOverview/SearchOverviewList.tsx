import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  search: string;
  handleRemoveSearch: (remove: string) => void;
  handleClose: () => void;
};

export default function SearchOverviewList({ search, handleRemoveSearch, handleClose }: Props) {
  const router = useRouter();

  function handleSearchClick() {
    const params = new URLSearchParams();
    params.append('name', search);
    handleClose();
    router.push(`/products?${params.toString()}`);
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    handleRemoveSearch(search);
  }

  return (
    <li className="w-full flex items-center justify-between text-base cursor-pointer" onClick={handleSearchClick}>
      <div className="flex gap-[10]">
        <Image src="/assets/roundSearch.svg" alt="search" width={20} height={20} />
        <p className="text-[#404040] font-bold overflow-hidden whitespace-nowrap text-ellipsis">{search}</p>
      </div>
      <Image
        className="cursor-pointer"
        src="/assets/close.svg"
        alt="close"
        width={20}
        height={20}
        onClick={handleRemove}
      />
    </li>
  );
}
