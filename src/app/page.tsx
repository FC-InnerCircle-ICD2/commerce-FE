import { getBanners } from '@/api/banner';
import Carousel from '@/components/home/Carousel';
import { Header } from '@/components/layout';
import MobileFooter from '@/components/layout/footer/MobileFooter';

export default async function Home() {
  const banners = await getBanners();
  console.log(banners);
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="grow">
        <Carousel />
      </div>
      <MobileFooter />
    </div>
  );
}
