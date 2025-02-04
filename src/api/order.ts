import { MOCK_URL } from '@/constants/constant';

export interface IOrder {
  paymentMethod: 'BANK_TRANSFER' | 'CARD' | 'KAKAO_PAY' | 'TOSS' | 'NAVER_PAY';
  cardInfo: {
    cardNumber: string;
    expirationDate: string;
    cvc: string;
    cardOwnerName: string;
  };
  orderItems: [
    {
      productId: number;
      productOptionId: number;
      productName: string;
      price: number;
      quantity: number;
    },
  ];
  delivery: {
    name: string;
    phoneNumber: string;
    zonecode: string;
    address: string;
    detailAddress: string;
    deliveryMemo: string;
  };
}

export const ORDER_URL = '/v1/orders';

export const postOrder = async (orderData: IOrder) => {
  const response = await fetch(`${MOCK_URL}${ORDER_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error('Failed to place order');
  }

  return response.status;
};
