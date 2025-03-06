import { ORDER_BASE_URL } from '@/constants/constant';
import { fetchWithAuth } from '@/store/fetchWithAuth';

export interface OrderOption {
  productId: number;
  productOptionDetails: Array<{
    productOptionId: number;
    productOptionDetailId: number;
    additionalPrice: number;
  }>;
  categoryId: number;
  productName: string;
  price: number;
  quantity: number;
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
  zoneCode: string;
  address: string;
  detailAddress: string;
  deliveryMemo: string;
}

export interface IOrder {
  paymentMethod: PaymentMethodType;
  cardInfo: CardInfo;
  delivery: Delivery;
  orderItems: OrderOption[];
  cardNumber: string;
  expirationDate: string;
  cvc: string;
}

export const ORDER_URL = 'api/v1/orders';

export const postOrder = async (orderData: IOrder) => {
  const response = await fetchWithAuth(`${ORDER_BASE_URL}/${ORDER_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error('Failed to place order');
  }
  return { status: response.status, data: await response.json() };
};

export interface MyOrderProps {
  page: number;
  size: number;
  sort?: Array<string>;
}

export const getMyOrderList = async (props: MyOrderProps) => {
  const queryParams = new URLSearchParams({
    page: props.page.toString(),
    size: props.size.toString(),
    ...(props.sort && { sort: props.sort.join(',') }),
  }).toString();

  const response = await fetchWithAuth(`${ORDER_BASE_URL}/api/v1/orders/my-orders?${queryParams}`);

  if (!response.ok) {
    throw new Error(`Error fetching orders: ${response.statusText}`);
  }

  return response.json();
};
