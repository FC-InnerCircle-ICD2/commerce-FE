import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  url: string;
  name: string;
};

export default function ProductDetailClientCarousel({ url, name }: Props) {
  return (
    <div className="w-full lg:w-1/2 flex-shrink-0">
      <img src={url} alt={name} className="w-full h-[500px] object-cover" />
    </div>
  );
}
