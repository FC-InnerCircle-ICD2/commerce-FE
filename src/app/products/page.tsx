import React from 'react';
import Card from '@/components/common/Card';
import CategoryList from './_components/CategoryList';
import Filter from '@/app/products/_components/filter/Filter';
import { IProduct } from '@/api/product';
import { getProducts } from '@/api/product';

export default async function ProductsPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { category, name, rating, sort } = searchParams;

  const products = await getProducts({
    productCategoryId: category ? parseInt(category) : undefined,
    name,
    rating: rating ? parseInt(rating) : undefined,
    sort: sort as 'registration' | 'sales' | 'priceAsc' | 'priceDesc',
  }).catch(() => null); // 실패 시 null 반환

  if (!products) {
    return <div>상품을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.</div>;
  }

  return (
    <div className="max-w-custom mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* 왼쪽 사이드바 영역 */}
        <div className="lg:w-1/4">
          {/* 카테고리 영역 */}
          <div className="w-full h-fit bg-slate-50 border border-slate-300 rounded-xl hidden lg:block mb-5">
            <CategoryList />
          </div>
          {/* 필터 영역 */}
          <div className="w-full h-fit bg-slate-50 border border-slate-300 rounded-xl">
            <Filter products={products} />
          </div>
        </div>

        {/* 상품 목록 영역 */}
        <main className="lg:w-3/4">
          <h1 className="text-3xl font-bold mb-8">상품 breadcrumb 컴포넌트 추가</h1>
          <div className="lg:px-0 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 bg-slate-50 border border-slate-300 rounded-xl p-7">
              {products.map((product) => (
                <Card
                  key={product.productId}
                  imgUrl={product.images[0].url}
                  title={product.name}
                  price={product.price}
                  review={3}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
