// import { BASE_URL } from '@/constants/constant';

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

export const ORDER_URL = 'api/v1/orders';
const ORDER_BASE_URL = 'https://order-api.emmotional-cart.click';

export const postOrder = async (orderData: IOrder) => {
  const response = await fetch(`https://virtserver.swaggerhub.com/SGYJ8896/ecommerce-order-v2/1.0.0/${ORDER_URL}`, {
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
