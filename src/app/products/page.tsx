import React from 'react';
import Card from '@/components/common/Card';
import CategoryList from './_components/CategoryList';
import Filter from '@/app/products/_components/filter/Filter';
import { Breadcrumbs } from '@/components/common';
import { mockProducts } from '@/app/products/_components/mockData';

export default function ProductsPage() {
  // 임시 상품 데이터
  const products = [
    {
      productId: 1,
      name: '상품 1',
      price: 29000,
      description: '상품 설명 1',
      imageUrl: '/images/product-1.jpg',
      discount: 10,
      review: 5,
    },
    {
      productId: 2,
      name: '상품 2',
      price: 39000,
      description: '상품 설명 2',
      imageUrl: '/images/product-2.jpg',
      discount: 20,
      review: 4,
    },
    {
      productId: 3,
      name: '상품 3',
      price: 49000,
      description: '상품 설명 3',
      imageUrl: '/images/product-3.jpg',
      discount: 20,
      review: 3,
    },
    {
      productId: 4,
      name: '상품 1',
      price: 29000,
      description: '상품 설명 1',
      imageUrl: '/images/product-1.jpg',
      discount: 10,
      review: 5,
    },
    {
      productId: 5,
      name: '상품 2',
      price: 39000,
      description: '상품 설명 2',
      imageUrl: '/images/product-2.jpg',
      discount: 20,
      review: 4,
    },
    {
      productId: 6,
      name: '상품 3',
      price: 49000,
      description: '상품 설명 3',
      imageUrl: '/images/product-3.jpg',
      discount: 20,
      review: 3,
    },
    {
      productId: 7,
      name: '상품 2',
      price: 39000,
      description: '상품 설명 2',
      imageUrl: '/images/product-2.jpg',
      discount: 20,
      review: 4,
    },
    {
      productId: 8,
      name: '상품 3',
      price: 49000,
      description: '상품 설명 3',
      imageUrl: '/images/product-3.jpg',
      discount: 20,
      review: 3,
    },
  ];

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
            <Filter products={mockProducts} />
          </div>
        </div>

        {/* 상품 목록 영역 */}
        <main className="lg:w-3/4">
          <div className='mb-8'><Breadcrumbs /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 bg-slate-50 border border-slate-300 rounded-xl p-7">
            {products.map((product) => (
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
