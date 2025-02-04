import React from 'react';
import Card from '@/components/common/Card';
import CardSkeleton from '@/components/common/CardSkeleton';
import CategoryList from './_components/CategoryList';
import Filter from '@/app/products/_components/filter/Filter';
import { Breadcrumbs } from '@/components/common';
import { getProducts } from '@/api/product';
import { MobileFilter } from '@/app/products/_components/filter/MobileFilter';
import { Header } from '@/components/layout';
import { Suspense } from 'react';

const ProductSkeletons = () => {
  return (
    <div className="lg:px-0 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-slate-50 border border-slate-300 rounded-xl p-7">
        {[...Array(8)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

type Params = Promise<{
  keyword: string;
  priceMin: string;
  priceMax: string;
  rating: string;
  pageNumber: string;
  pageSize: string;
}>;

const ProductContent = async ({ searchParams }: { searchParams: Params }) => {
  const { keyword, priceMin, priceMax, rating, pageNumber, pageSize } = await searchParams;

  const products = await getProducts({
    keyword,
    priceMin: priceMin ? Number(priceMin) : undefined,
    priceMax: priceMax ? Number(priceMax) : undefined,
    rating: rating ? Number(rating) : undefined,
    pageNumber: pageNumber ? Number(pageNumber) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
    productId: undefined,
    categoryId: undefined,
  });

  if (!products) {
    return <ProductSkeletons />;
  }

  return (
    <div className="lg:px-0 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-slate-50 border border-slate-300 rounded-xl p-7">
        {products.map((product) => (
          <Card
            key={product.productId}
            imgUrl={product.options[0].optionDetails[0].url}
            title={product.name}
            price={product.price}
            review={3}
          />
        ))}
      </div>
    </div>
  );
};

export default async function ProductsPage({ searchParams }: { searchParams: Params }) {
  try {
    const { keyword, priceMin, priceMax, rating, pageNumber, pageSize } = await searchParams;

    const products = await getProducts({
      keyword,
      priceMin: priceMin ? Number(priceMin) : undefined,
      priceMax: priceMax ? Number(priceMax) : undefined,
      rating: rating ? Number(rating) : undefined,
      pageNumber: pageNumber ? Number(pageNumber) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      productId: undefined,
      categoryId: undefined,
    });

    return (
      <>
        <Header />
        <div className="max-w-custom mx-auto lg:pt-8 pb-8">
          <div className="flex flex-col lg:flex-row lg:gap-5">
            {/* 왼쪽 사이드바 영역 */}
            <div className="lg:w-1/4">
              {/* 카테고리 영역 */}
              <div className="w-full h-fit bg-slate-50 border border-slate-300 rounded-xl hidden lg:block mb-5">
                <CategoryList />
              </div>
              {/* 필터 영역 */}
              <div className="w-full h-fit bg-slate-50 border border-slate-300 rounded-xl hidden lg:block mb-5">
                <Filter products={products} />
              </div>
            </div>

            {/* 상품 목록 영역 */}
            <main className="lg:w-3/4">
              <div className="lg:mb-8 mb-1">
                <Breadcrumbs />
              </div>
              <div className="lg:hidden block mb-8 px-3 py-2 bg-slate-50 border-slate-300 border">
                <MobileFilter products={products} />
              </div>
              <Suspense fallback={<ProductSkeletons />}>
                <ProductContent searchParams={searchParams} />
              </Suspense>
            </main>
          </div>
        </div>
      </>
    );
  } catch {
    return <div>상품을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.</div>;
  }
}
