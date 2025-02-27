import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { IProductDetail } from '@/api/product';

type Props = {
  product: IProductDetail;
};

export default function ProductDetailClientCarousel({ product }: Props) {
  return (
    <div className="w-full lg:w-1/2 flex-shrink-0">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ el: '.custom-pagination', clickable: true }}
        className="w-full"
      >
        {product.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.url ?? '/placeholder-image.jpg'}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination mt-4 flex justify-center"></div>
    </div>
  );
}
