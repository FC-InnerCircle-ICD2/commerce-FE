import { getBanners } from '@/api/banner';
import Carousel from '@/components/home/Carousel';
import ProductList from '@/components/home/ProductList';
import ProductSkeletons from '@/components/home/ProductSkeleton';
import { Header } from '@/components/layout';
import { Suspense } from 'react';

export default async function Home() {
  try {
    const banners = await getBanners();
    return (
      <div className="flex flex-col h-screen overflow-x-hidden">
        <Header />
        <div className="grow flex flex-col gap-[20]">
          <Carousel banners={banners} />
          <Suspense fallback={<ProductSkeletons />}>
            <ProductList />
          </Suspense>
        </div>
      </div>
    );
  } catch {
    return <div>error</div>;
  }
}
