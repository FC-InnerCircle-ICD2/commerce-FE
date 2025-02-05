import { MOCK_URL } from '@/constants/constant';

export interface OrderOption {
  options: [
    {
      optionName: string;
      value: string;
    },
  ];
  quantity: number;
  price: number;
}

export type PaymentMethodType = 'BANK_TRANSFER' | 'CARD' | 'KAKAO_PAY' | 'TOSS' | 'NAVER_PAY';
export interface CardInfo {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  cardOwnerName: string;
}

export interface OrderItems {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    image?: string | null;
    category: {
      id: number;
      name: string;
    };
    provider: {
      id: number;
      name: string;
      description: string;
    };
  };
  selectedOptions: OrderOption[];
  totalAmount: number;
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
  paymentMethod: PaymentMethodType;
  cardInfo: CardInfo;
  orderItems: OrderItems;
  delivery: Delivery;
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
