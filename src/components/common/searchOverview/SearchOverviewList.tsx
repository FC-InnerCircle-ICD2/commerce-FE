import Image from 'next/image';

type Props = {
  search: string;
  handleRemoveSearch: (remove: string) => void;
};

export default function SearchOverviewList({ search, handleRemoveSearch }: Props) {
  return (
    <li className="w-full flex items-center justify-between text-base">
      <div className="flex gap-[10] overflow-hidden">
        <Image src="/assets/roundSearch.svg" alt="search" width={20} height={20} />
        <p className="text-[#404040] font-bold overflow-hidden whitespace-nowrap text-ellipsis">{search}</p>
      </div>
      <Image
        className="cursor-pointer"
        src="/assets/close.svg"
        alt="close"
        width={20}
        height={20}
        onClick={() => handleRemoveSearch(search)}
      />
    </li>
  );
}
