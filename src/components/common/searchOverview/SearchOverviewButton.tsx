type Props = {
  title: string;
};

export default function SearchOverviewButton({ title }: Props) {
  return <button className="bg-[#F1F5F9] rounded-[20] text-[#334155] text-sm py-[15px] px-[14px]">{title}</button>;
}
