import { numberFormatting } from '@/utils/numberFormatting';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import React from 'react';

interface OrderProduct {
  productId: string;
  providerId: null | string;
  providerName: null | string;
  productName: string;
  productImage: null | string;
  productPrice: number;
  quantity: number;
}

interface Props {
  orderInfo: {
    orderId: string;
    orderProductList: Array<OrderProduct>;
    totalOrderPrice: number;
    orderAt: string;
    orderStatus: string;
  };
}

export default function OrderItem(props: Props) {
  const { orderInfo } = props;

  const getFormattedDate = (date: string) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  return (
    <div className="border border-slate-300 bg-slate-50 w-full h-auto p-6 lg:p-8 flex flex-col mt-2">
      <p className="font-semibold">{orderInfo.orderStatus}</p>
      {orderInfo.orderProductList.map((product, index) => (
        <React.Fragment key={product.productId}>
          <div className="flex items-center my-4">
            <div className="bg-neutral-300 w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-[10px]"></div>
            <div className="flex flex-col ml-4 gap-0.5 max-w-[calc(100%-100px)]">
              <p className="text-neutral-500 text-sm">{`${getFormattedDate(orderInfo.orderAt)} 주문`}</p>
              <p className="font-semibold text-sm md:text-md truncate">{product.productName}</p>
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm md:text-md">{`${numberFormatting(product.productPrice)}원`}</p>
                <span className="w-0.5 h-3 bg-neutral-300"></span>
                <p className="text-sm">{`${product.quantity}개`}</p>
              </div>
              <button className="w-20 text-left flex items-center gap-1 text-neutral-500 text-sm">
                상세보기
                <ChevronRightIcon className="w-4 h-4 text-neutral-400 inline-block" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <button className="border border-slate-400 px-3.5 py-2.5 bg-white rounded-lg text-sm w-full">
              리뷰쓰기
            </button>
            <button className="border border-neutral-300 px-3.5 py-2.5 bg-white rounded-lg text-sm w-full">
              재구매
            </button>
          </div>
          {index !== orderInfo.orderProductList.length - 1 && (
            <div className="border-b border-slate-300 border-dashed mt-4"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
