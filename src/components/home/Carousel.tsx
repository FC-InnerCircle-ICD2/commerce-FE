'use client';

import type { IBanner } from '@/api/banner';
import { BannerCarousel } from 'ji-react-carousel';

type Props = {
  banners: IBanner[];
};

export default function Carousel({ banners }: Props) {
  return (
    <div className="w-full h-[350] bg-slate-200">
      <BannerCarousel
        auto={false}
        autoTimer={2000}
        bannerInfo={[
          ...banners.map((item) => {
            return { iconUrl: item.iconUrl, title: item.title };
          }),
        ]}
      >
        {banners.map((item) => {
          return <img key={item.id} src={item.bannerImage.url} alt={item.title} className="w-full h-full" />;
        })}
      </BannerCarousel>
    </div>
  );
}
