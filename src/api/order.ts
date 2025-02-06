import { MOCK_URL } from '@/constants/constant';

export interface OrderOption {
  productId: number;
  options: Array<{
    productOptionName: string;
    productOptionId: number;
    productOptionValue: string;
    productOptionDetailId: number;
  }>;
  quantity: number;
  price: number;
  categoryId: number;
}

export type PaymentMethodType = 'BANK_TRANSFER' | 'CARD' | 'KAKAO_PAY' | 'TOSS' | 'NAVER_PAY';
export interface CardInfo {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  cardOwnerName: string;
}

export interface Delivery {
  name: string;
  phoneNumber: string;
  zonecode: string;
  address: string;
  detailAddress: string;
  deliveryMemo: string;
}

export interface IOrder {
  cardInfo: CardInfo;
  deliveryInfo: Delivery;
  totalAmount: number;
  orderItems: OrderOption[];
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
