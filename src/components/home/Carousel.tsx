import { IBanner } from '@/api/banner';

type Props = {
  banners: IBanner[];
};

export default function Carousel({ banners }: Props) {
  return <div className="w-full h-[350] bg-slate-200">{banners[0].title}</div>;
}
