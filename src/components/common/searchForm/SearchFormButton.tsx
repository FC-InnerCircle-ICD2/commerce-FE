type Props = {
  title: string;
};

export default function SearchFormButton({ title }: Props) {
  return <button className="bg-[#F1F5F9] rounded-[20] text-[#334155] text-sm py-[15] px-[14]">{title}</button>;
}
