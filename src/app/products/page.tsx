import React from 'react';
import Card from '@/components/common/Card';
import CategoryList from './_components/CategoryList';
import Filter from '@/app/products/_components/filter/Filter';
import { BASE_URL } from '@/constants/constant';
import { ProductApis } from '@/constants/apiUrl';

interface Product {
  productId: number;
  imageUrl: string;
  name: string;
  price: number;
  discount: number;
  review: number;
}

async function getProducts() {
  const response = await fetch(`${BASE_URL}${ProductApis.getProducts}`);
  const data = await response.json();
  return data.products;
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-custom mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* 왼쪽 사이드바 영역 */}
        <div className="lg:w-1/4">
          {/* 카테고리 영역 */}
          <div className="w-full h-fit bg-slate-50 border border-slate-300 rounded-xl hidden tablet:block mb-5">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 bg-slate-50 border border-slate-300 rounded-xl p-7">
            {products.map((product:Product) => (
              <Card
                key={product.productId}
                imgUrl={product.imageUrl}
                title={product.name}
                price={product.price}
                discount={product.discount}
                review={product.review}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
