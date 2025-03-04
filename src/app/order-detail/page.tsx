'use client';

import { Footer, Header } from '@/components/layout';
import OrderItem, { IOrderProductOptions } from './_components/OrderItem';
import { useState } from 'react';
import { useMyOrderList } from '@/hooks/queries/useMyOrderList';
import Pagination from './_components/Pagenation';

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
  const { data: orders, isLoading } = useMyOrderList({ page, size: 10 });

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
              <button className="bg-slate-500 rounded-full w-14 h-8 lg:h-10 text-sm text-white">전체</button>
              {/* <div className="relative w-60 lg:w-72">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full border border-neutral-300 bg-white rounded-full h-8 lg:h-10 text-sm px-4"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 lg:px-3 lg:py-1"
                >
                  🔍
                </button>
              </div> */}
            </div>
          </div>
        </div>

        <div className="w-[calc(100%-32px)] lg:w-[calc(100%-200px)] flex flex-col mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <span className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></span>
            </div>
          ) : orders?.content?.length > 0 ? (
            orders.content.map((orderInfo: OrderContent) => <OrderItem orderInfo={orderInfo} key={orderInfo.orderId} />)
          ) : (
            <div className="text-center py-10 text-gray-500">주문 내역이 없습니다.</div>
          )}
        </div>
      </div>

      {!isLoading && (
        <Pagination
          currentPage={orders?.page?.number || 1}
          totalPages={orders?.page?.totalPages || 1}
          onPageChange={setPage}
        />
      )}

      <div className="mt-12 lg:mt-20 w-full flex flex-col">
        <Footer />
      </div>
    </div>
  );
}
