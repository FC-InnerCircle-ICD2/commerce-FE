import { getBanners } from '@/api/banner';
import Carousel from '@/components/home/Carousel';
import ProductList from '@/components/home/ProductList';
import { ProductSkeleton } from '@/components/skeletons';

import { Header } from '@/components/layout';
import { Suspense } from 'react';

export default async function Home() {
  console.log('cicd 테스트')
  try {
    const banners = await getBanners();
    return (
      <div className="flex flex-col h-screen overflow-x-hidden">
        <Header />
        <div className="grow flex flex-col gap-5">
          <Carousel banners={banners} />
          <Suspense fallback={<ProductSkeleton />}>
            <ProductList />
          </Suspense>
        </div>
      </div>
    );
  } catch {
    return <div>error</div>;
  }
}
