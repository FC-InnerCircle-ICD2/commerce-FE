'use client';

import type { IBanner } from '@/api/banner';
import { BannerCarousel } from 'ji-react-carousel';
import { useRouter } from 'next/navigation';

type Props = {
  banners: IBanner[];
};

export default function Carousel({ banners }: Props) {
  const router = useRouter();
  return (
    <div className="w-full h-[350] bg-slate-200">
      <BannerCarousel
        auto={false}
        autoTimer={2000}
        bannerInfo={[
          ...banners.map((item) => {
            return { iconUrl: '/assets/paw.svg', title: item.title };
          }),
        ]}
      >
        {banners.map((item) => {
          return (
            <img
              key={item.id}
              src={item.bannerImage.url}
              alt={item.title}
              className="w-full h-full cursor-pointer"
              onClick={() => {
                if (item.productBannerResponse?.linkUrl) {
                  router.push(item.productBannerResponse.linkUrl);
                } else {
                  alert('배너 경로가 존재하지 않습니다.');
                }
              }}
            />
          );
        })}
      </BannerCarousel>
    </div>
  );
}
