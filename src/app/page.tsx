import { getBanners } from '@/api/banner';
import Carousel from '@/components/home/Carousel';
import ProductList from '@/components/home/ProductList';
import { ProductSkeleton } from '@/components/skeletons';
import { headers } from 'next/headers';

import { Header } from '@/components/layout';
import { Suspense } from 'react';

export default async function Home() {
  try {
    const banners = await getBanners();
    const headerList = await headers();
    const cookieHeader = headerList.get('cookie'); // 전체 쿠키 문자열을 가져옴
    console.log(headerList);
    console.log(cookieHeader);

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
