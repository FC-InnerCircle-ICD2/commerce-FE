import { fetchWithAuth } from '@/store/fetchWithAuth';

const BASE_URL = 'https://product-api.emmotional-cart.click/api/v1/carts';
// const BASE_URL = 'http://3.38.23.68:8080/v1/carts';

export interface ICartOption {
  id: number;
  name: string;
  optionDetail: {
    id: number;
    value: string;
    quantity: number;
    additionalPrice: number;
  };
}

export interface ICartItem {
  itemId: string;
  productId: string;
  productName: string;
  price: number;
  subTotalPrice: number;
  options: Array<{
    id: number;
    name: string;
    optionDetail: {
      id: number;
      value: string;
      quantity: number;
      additionalPrice: number;
    };
  }>;
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
    productId: string;
    productName: string;
    price: number;
    options: Array<ICartOption>;
    images: {
      id: number;
      url: string;
    };
    provider: {
      id: number;
      name: string;
    };
  };
};

export const postAddCarts = async ({ datas }: AddCartProps) => {
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

export type ChangeCartProps = {
  itemId: string;
  optionDetailQuantity: number;
};

export const postChangeCartQuantity = async (props: ChangeCartProps) => {
  const response = await fetchWithAuth(BASE_URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

type DeleteProps = {
  itemIds: Array<string>;
};

export const deleteCartItem = async (props: DeleteProps) => {
  const response = await fetchWithAuth(`${BASE_URL}/items`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(props),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const removeCart = async () => {
  const response = await fetchWithAuth(BASE_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
