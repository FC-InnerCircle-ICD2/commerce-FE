import React from 'react';
import Card from '@/components/common/Card';
import CardSkeleton from '@/components/common/CardSkeleton';
import CategoryList from './_components/CategoryList';
import Filter from '@/app/products/_components/filter/Filter';
import { Breadcrumbs } from '@/components/common';
import { getProducts, IProduct, SORT_OPTIONS } from '@/api/product';
import { MobileFilter } from '@/app/products/_components/filter/MobileFilter';
import { Header } from '@/components/layout';
import { Suspense } from 'react';
import CategoryHeader from '../category/_components/CategoryHeader';
import PREPARING from '@/assets/preparing.png';
import Pagination from './_components/Pagination';

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

const ProductContent = async ({
  searchParams,
}: {
  searchParams: Promise<{
    keyword?: string;
    priceMin?: string;
    priceMax?: string;
    rating?: string;
    pageNumber?: string;
    pageSize?: string;
    categoryId?: string;
    sortOption?: string;
  }>;
}) => {
  const params = await searchParams;

  const products = await getProducts({
    keyword: params.keyword,
    priceMin: params.priceMin ? Number(params.priceMin) : undefined,
    priceMax: params.priceMax ? Number(params.priceMax) : undefined,
    rating: params.rating ? Number(params.rating) : undefined,
    pageNumber: params.pageNumber ? Number(params.pageNumber) : undefined,
    pageSize: params.pageSize ? Number(params.pageSize) : undefined,
    productId: undefined,
    categoryId: params.categoryId ? Number(params.categoryId) : undefined,
    sortOption: params.sortOption ? (params.sortOption as SORT_OPTIONS) : undefined,
  });

  if (!products) {
    return <ProductSkeletons />;
  }

  function getImageUrl(product: IProduct) {
    return product.options.length === 0 || !product.options[0].optionDetails
      ? PREPARING.src
      : product.options[0].optionDetails[0].url;
  }

  return (
    <>
      {/* 왼쪽 사이드바 영역 */}
      <div className="lg:w-1/4">
        {/* 카테고리 영역 */}
        <div className="w-full h-fit bg-slate-50 border border-slate-300 rounded-xl hidden lg:block mb-5">
          <Suspense>
            <CategoryList />
          </Suspense>
        </div>
        {/* 필터 영역 */}
        <div className="w-full h-fit bg-slate-50 border border-slate-300 rounded-xl hidden lg:block mb-5">
          <Filter products={products.content} />
        </div>
      </div>

      {/* 상품 목록 영역 */}
      <main className="lg:w-3/4">
        <div className="lg:mb-8 mb-1">
          <Suspense>
            <Breadcrumbs />
          </Suspense>
        </div>
        <div className="lg:hidden block mb-8 px-3 py-2 bg-slate-50 border-slate-300 border">
          <MobileFilter products={products.content} />
        </div>
        <div className="lg:px-0 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-slate-50 border border-slate-300 rounded-xl p-7">
            {products.content.map((product) => (
              <Card
                key={product.productId}
                productId={product.productId}
                imgUrl={getImageUrl(product)}
                title={product.name}
                price={product.price}
                review={product.rating ?? 0}
              />
            ))}
          </div>
          <Pagination currentPage={products.page.number} totalPages={products.page.totalPages} />
        </div>
      </main>
    </>
  );
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    keyword?: string;
    priceMin?: string;
    priceMax?: string;
    rating?: string;
    pageNumber?: string;
    pageSize?: string;
    categoryId?: string;
    sortOption?: string;
  }>;
}) {
  return (
    <>
      <div className="lg:hidden">
        <Suspense>
          <CategoryHeader />
        </Suspense>
      </div>

      <div className="hidden md:block">
        <Header />
      </div>
      <div className="max-w-custom mx-auto pb-8">
        <div className="flex flex-col lg:flex-row lg:gap-5">
          <Suspense fallback={<ProductSkeletons />}>
            <ProductContent searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
