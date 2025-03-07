'use client';

import { Footer, Header } from '@/components/layout';
import { IOrderProductOptions } from './_components/OrderItem';
import { lazy, Suspense, useState } from 'react';
import { useMyOrderList } from '@/hooks/queries/useMyOrderList';
import OrderListSkeleton from '@/components/skeletons/OrderListSkeleton';
const OrderItemList = lazy(() => import('./_components/OrderItemList'));

export interface OrderProduct {
  productId: string;
  providerId: null | string;
  providerName: null | string;
  productName: string;
  productImage: null | string;
  productPrice: number;
  productOptions: Array<IOrderProductOptions>;
  quantity: number;
}
export interface OrderContent {
  orderId: string;
  orderProductList: Array<OrderProduct>;
  totalOrderPrice: number;
  orderAt: string;
  orderStatus: string;
}

export default function OrderDetail() {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<string[]>(['orderAt']);
  // TODO: 기존 size = 10이었는데 현재 10으로 설정시 오류가 발생합니다.
  const { data: orders } = useMyOrderList({ page, size: 1, sort: sort });

  const handleFilterChange = (newFilter: 'orderAt' | 'desc') => {
    setSort((prevSort) => (prevSort.includes(newFilter) ? prevSort : [...prevSort, newFilter]));
    setPage(0);
  };

  return (
    <div className="w-[100%] h-auto flex flex-col items-center justify-center">
      <Header />

      {/* Content */}
      <div className="flex flex-col w-full">
        <div className="mt-[20px] lg:mt-[50px] w-[calc(100%-32px)] lg:w-[calc(100%-200px)] flex flex-col lg:flex-row mx-auto">
          <div className="rounded-t-[.9375rem] border border-slate-300 bg-slate-50 w-full h-auto flex flex-col">
            <h3 className="text-md lg:text-lg font-semibold p-4 lg:p-8">주문/배송내역</h3>
            {/* <OrderDetailSearch /> */}
            <div className="w-full h-[50px] lg:h-[60px] border-t border-slate-300 px-4 lg:px-8 flex items-center justify-between">
              <button
                onClick={() => handleFilterChange('orderAt')}
                className="bg-slate-500 rounded-full w-14 h-8 lg:h-10 text-sm text-white"
              >
                전체
              </button>
            </div>
          </div>
        </div>
        <Suspense fallback={<OrderListSkeleton />}>
          <OrderItemList orders={orders?.content} />
        </Suspense>
      </div>

      {/* {!isLoading && (
        <Pagination
          currentPage={orders?.page?.number || 0}
          totalPages={orders?.page?.totalPages || 1}
          onPageChange={setPage}
        />
      )} */}

      <div className="mt-12 lg:mt-20 w-full flex flex-col">
        <Footer />
      </div>
    </div>
  );
}
