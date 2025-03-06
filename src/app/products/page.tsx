import React, { Suspense } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Card from '@/components/common/Card';
import { CategorySkeleton, FilterSkeleton, ProductListSkeleton } from '@/components/skeletons';
import Filter from '@/app/products/_components/filter/Filter';
import { Breadcrumbs } from '@/components/common';
import { MobileFilter } from '@/app/products/_components/filter/MobileFilter';
import { Footer, Header } from '@/components/layout';
import CategoryHeader from '../category/_components/CategoryHeader';
import Pagination from './_components/Pagination';
import { getProducts, SORT_OPTIONS, IProduct } from '@/api/product';
import CategoryServer from './_components/CategoryServer';

interface SearchParams {
  keyword?: string;
  priceMin?: string;
  priceMax?: string;
  rating?: string;
  pageNumber?: string;
  pageSize?: string;
  categoryId?: string;
  sortOption?: SORT_OPTIONS;
}

const FilterSection = async ({
  searchParams,
  isMobile = false,
}: {
  searchParams: Promise<SearchParams>;
  isMobile?: boolean;
}) => {
  const params = await searchParams;
  const products = await getProducts(parseSearchParams(params));

  if (isMobile) {
    return <MobileFilter products={products.content} />;
  }

  return (
    <div className="w-full h-fit bg-slate-50 border border-slate-300 rounded-xl hidden lg:block mb-5">
      <Filter products={products.content} />
    </div>
  );
};

const ProductGrid = ({ products }: { products: IProduct[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
    {products.map((product) => (
      <Card
        key={product.productId}
        productId={product.productId}
        imgUrl={product.images?.[0]?.url || '/assets/preparing.png'}
        title={product.name}
        price={product.price}
        review={product.rating ?? 0}
      />
    ))}
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <ShoppingBagIcon className="w-16 h-16 text-slate-300 mb-4" />
    <p className="text-lg font-medium text-slate-600">상품이 없습니다</p>
    <p className="text-sm text-slate-400 mt-1">다른 검색어로 다시 시도해보세요</p>
  </div>
);

const ProductContent = async ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
  const params = await searchParams;
  const products = await getProducts(parseSearchParams(params));

  return (
    <div className="lg:px-0 px-4">
      <div className="bg-slate-50 border border-slate-300 rounded-xl p-7">
        {products.content.length > 0 ? <ProductGrid products={products.content} /> : <EmptyState />}
      </div>
      {products.content.length > 0 && (
        <Pagination currentPage={products.page.number} totalPages={products.page.totalPages} />
      )}
    </div>
  );
};

const parseSearchParams = (params: SearchParams) => ({
  keyword: params.keyword,
  priceMin: params.priceMin ? Number(params.priceMin) : undefined,
  priceMax: params.priceMax ? Number(params.priceMax) : undefined,
  rating: params.rating ? Number(params.rating) : undefined,
  pageNumber: params.pageNumber ? Number(params.pageNumber) : undefined,
  pageSize: params.pageSize ? Number(params.pageSize) : 12,
  productId: undefined,
  categoryId: params.categoryId ? Number(params.categoryId) : undefined,
  sortOption: params.sortOption ? params.sortOption : undefined,
});

export default async function ProductsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
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
          <div className="lg:w-1/4">
            <Suspense fallback={<CategorySkeleton />}>
              <CategoryServer />
            </Suspense>
            <Suspense fallback={<FilterSkeleton />}>
              <FilterSection searchParams={searchParams} />
            </Suspense>
          </div>

          <div className="lg:w-3/4">
            <div className="lg:mb-5 mb-1">
              <Suspense>
                <Breadcrumbs />
              </Suspense>
            </div>
            <div className="lg:hidden block mb-5 px-3 py-2 bg-slate-50 border-slate-300 border">
              <Suspense>
                <FilterSection searchParams={searchParams} isMobile={true} />
              </Suspense>
            </div>
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductContent searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
