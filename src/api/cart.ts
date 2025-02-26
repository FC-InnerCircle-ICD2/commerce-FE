import { fetchWithAuth } from '@/store/fetchWithAuth';

// const BASE_URL = 'http://product-api.emmotional-cart.click/v1/carts';
const BASE_URL = 'http://3.38.23.68:8080/v1/carts';

export interface ICartItem {
  productId: number;
  productName: string;
  price: number;
  subTotalPrice: number;
  option: {
    id: number;
    name: string;
    optionDetail: {
      id: number;
      value: string;
      quantity: number;
      additionalPrice: number;
    };
  };
  images: {
    id: number;
    url: string;
  };
  provider: {
    id: number;
    name: string;
  };
  selected: boolean;
}

export interface ICart {
  cartId: string;
  totalPrice: number;
  items: Array<ICartItem>;
}

export const getCarts = async () => {
  const response = await fetchWithAuth(BASE_URL);

  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }

  const data: ICart = await response.json();
  return data;
};

export type AddCartProps = {
  datas: {
    productId: number;
    productName: string;
    price: number;
    subTotalPrice: number;
    optionId: number;
    optionName: string;
    optionDetailId: number;
    optionDetailValue: string;
    optionDetailQuantity: number;
    optionDetailAdditionalPrice: number;
    imageId: number;
    imageUrl: string;
    providerId: number;
    providerName: string;
  };
};

export const postAddCarts = async ({ datas }: AddCartProps) => {
  console.log(datas);
  const response = await fetchWithAuth(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datas),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
