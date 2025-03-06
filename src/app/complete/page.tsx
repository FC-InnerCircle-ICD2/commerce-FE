import React from 'react';
import CompleteCardLists from './_components/CompleteCardLists';
import { Header } from '@/components/layout';
import Link from 'next/link';
import { numberFormatting } from '@/utils/numberFormatting';

export default async function Complete({ searchParams }: { searchParams: Promise<{ data?: string }> }) {
  const { data } = await searchParams;
  let orderData = {
    orderId: '1188994847292458349',
    paymentMethodName: '카드',
    totalPrice: 18000,
    orderItems: [
      {
        orderItemId: '4017534764667813762',
        productId: '4004470764630528356',
        productName: 'hailie test2',
        orderItemPrice: 9000,
        quantity: 2,
      },
    ],
    deliveryInfo: {
      recipientName: '홍길동',
      recipientPhone: '010-1234-5678',
      recipientAddress: '경기도 광명시 광명동 주소 101동 1004호',
    },
  };
  if (data) {
    orderData = JSON.parse(decodeURIComponent(data));
  }
  return (
    <>
      <Header />
      <div className="flex items-center justify-center bg-white mt-10 mb-32">
        <div className="w-full p-6 md:p-10 bg-slate-50 border border-1 border-slate-300 flex flex-col items-center max-w-[1240px] rounded-2xl max-sm:rounded-none">
          <div className="w-full max-w-[704px] flex flex-col items-center">
            <h2 className="text-center text-xl md:text-2xl font-semibold pb-6 md:pb-10">
              주문완료 <span className="font-normal">되었습니다</span>
            </h2>

            <div className="border-t border-gray-200 max-sm:w-[312px] w-[704px]" />
            <div className="py-6">
              <div className="flex items-center gap-3 pb-6">
                <h3 className="text-sm md:text-base font-semibold">주문번호</h3>
                <p className="text-gray-700 text-sm md:text-base underline">{orderData.orderId}</p>
              </div>

              <div className="border-t border-gray-200 max-sm:w-[312px] w-[704px] py-6 gap-2">
                <p className="text-sm md:text-base font-semibold mb-2">{orderData.deliveryInfo.recipientName}</p>
                <p>{orderData.deliveryInfo.recipientPhone}</p>
                <p className="text-gray-700 text-xs md:text-sm">{orderData.deliveryInfo.recipientAddress}</p>
              </div>

              <div className="border-t border-gray-200 max-sm:w-[312px] w-[704px] py-6 gap-2">
                <p className="text-sm md:text-base font-semibold mb-2">주문내역</p>
                <div className="flex flex-col gap-0.5">
                  {orderData.orderItems.map((orderItem) => (
                    <div key={orderItem.orderItemId} className="flex items-center gap-4">
                      <p className="text-xs md:text-sm">{orderItem.productName}</p>
                      <p className="text-xs md:text-sm text-gray-700">
                        {numberFormatting(orderItem.orderItemPrice)}원 / {orderItem.quantity}개
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 max-sm:w-[312px] w-[704px] py-6 gap-3 flex">
                <p className="text-sm md:text-base font-semibold">총 주문금액</p>
                <p className="text-sm md:text-base font-semibold">{`${numberFormatting(orderData.totalPrice)}원`}</p>
              </div>

              <div className="border-t border-gray-200 max-sm:w-[312px] w-[704px]" />
            </div>
            <Link
              href="/"
              className="text-center bg-slate-300 text-sky-950 w-[200px] max-sm:w-[312px] font-bold text-sm md:text-base py-3 rounded-lg hover:bg-slate-400 transition"
            >
              홈으로
            </Link>
          </div>
          <CompleteCardLists />
        </div>
      </div>
    </>
  );
}
