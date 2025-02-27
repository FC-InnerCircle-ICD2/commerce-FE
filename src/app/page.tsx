import { getBanners } from '@/api/banner';
import Carousel from '@/components/home/Carousel';
import ProductList from '@/components/home/ProductList';
import { ProductSkeleton } from '@/components/skeletons';
import { headers } from 'next/headers';
import { Header } from '@/components/layout';
import { Suspense } from 'react';
import { TokenHandler } from '@/components/TokenHandler';

export default async function Home() {
  try {
    const banners = await getBanners();
    const headerList = await headers();
    const cookieHeader = headerList.get('cookie') || '';

    // 쿠키에서 accessToken 추출
    const accessToken =
      cookieHeader
        .split('; ')
        .find((row) => row.startsWith('Access-Token='))
        ?.split('=')[1] || null;
    return (
      <div className="flex flex-col h-screen overflow-x-hidden">
        <Header />
        <TokenHandler accessToken={accessToken} />
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
