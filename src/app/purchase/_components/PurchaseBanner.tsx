'use client';

import { IOrder, postOrder } from '@/api/order';
import { useRouter } from 'next/navigation';

export default function PurchaseBanner() {
  const router = useRouter();

  const dummy: IOrder = {
    paymentMethod: 'CARD',
    cardInfo: {
      cardNumber: '1234-5678-1234-5678',
      expirationDate: '12/23',
      cvc: '123',
      cardOwnerName: '홍길동',
    },
    orderItems: {
      product: {
        id: 1,
        name: '테리파머',
        description: '테리파머 상품 설명',
        price: 86700,
        category: {
          id: 1,
          name: '테리파머',
        },
        provider: {
          id: 1,
          name: '테리파머 제조사',
          description: '테리파머 제조사 설명',
        },
      },
      selectedOptions: [
        {
          options: [
            {
              optionName: '색상',
              value: '블랙',
            },
          ],
          quantity: 1,
          price: 28900,
        },
        {
          options: [
            {
              optionName: '색상',
              value: '블루',
            },
          ],
          quantity: 1,
          price: 28900,
        },
        {
          options: [
            {
              optionName: '색상',
              value: '남색',
            },
          ],
          quantity: 1,
          price: 28900,
        },
      ],
      totalAmount: 86700,
    },
    delivery: {
      name: '홍길동(집)',
      phoneNumber: '010-1234-5678',
      zonecode: '12345',
      address: '경기도 광명시 광명동 주소 (광명동, 주소)',
      detailAddress: '101동 1004호',
      deliveryMemo: '배송 전 문자나 전화 부탁드립니다.',
    },
  };

  async function handleOrderButton() {
    try {
      const result = await postOrder(dummy);
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
        86,700원 주문하기
      </button>
    </div>
  );
}
