'use client';

import type { CardInfo, Delivery, IOrder, OrderOption, PaymentMethodType } from '@/api/order';
import { postOrder } from '@/api/order';
import { numberFormatting } from '@/utils/numberFormatting';
import { useRouter } from 'next/navigation';

interface Props {
  paymentMethod: PaymentMethodType;
  cardInfo: CardInfo;
  orderItems: OrderOption[];
  delivery: Delivery;
  totalPrice: number;
}

export default function PurchaseBanner(props: Props) {
  const { paymentMethod, cardInfo, orderItems, delivery, totalPrice } = props;
  const router = useRouter();

  const postData: IOrder = {
    cardInfo: cardInfo,
    deliveryInfo: delivery,
    totalAmount: totalPrice,
    orderItems: orderItems,
  };

  async function handleOrderButton() {
    try {
      console.log('postData: ', postData);
      const result = await postOrder(postData);
      if (result === 201) {
        router.push('/complete');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="md:fixed md:bottom-0 md:left-0 flex items-center justify-center lg:justify-between w-full h-[90px] lg:h-[100px] bg-white shadow-[0_-20px_30px_rgba(0,0,0,0.25)] px-[16px] lg:px-[100px]">
      <span className="hidden lg:block text-zinc-500">
        약관 및 주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
      </span>
      <button
        onClick={handleOrderButton}
        className="w-[360px] h-[60px] lg:h-[80px] rounded-[10px] bg-slate-300 text-sky-950 font-bold lg:text-xl"
      >
        {`${numberFormatting(totalPrice)}원 주문하기`}
      </button>
    </div>
  );
}
