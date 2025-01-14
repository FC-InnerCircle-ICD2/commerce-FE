import Image from 'next/image';

type Props = {
  search: string;
};

export default function SearchFormList({ search }: Props) {
  return (
    <li className="w-full flex items-center justify-between">
      <div className="flex gap-[10]">
        <Image src="/assets/roundSearch.svg" alt="search" width={20} height={20} />
        <p className="text-[#404040] font-bold overflow-hidden whitespace-nowrap text-ellipsis">{search}</p>
      </div>
      <Image src="/assets/close.svg" alt="search" width={20} height={20} />
    </li>
  );
}
