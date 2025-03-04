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

export type ChangeCartProps = {
  datas: {
    productId: number;
    optionId: number;
    optionDetailId: number;
    optionDetailQuantity: number;
  };
};

export const postChangeCartQuantity = async ({ datas }: ChangeCartProps) => {
  const response = await fetchWithAuth(BASE_URL, {
    method: 'PUT',
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

export interface IDeleteItem {
  productId: number;
  optionId: number;
  optionDetailId: number;
}

type DeleteProps = {
  datas: {
    items: Array<IDeleteItem>;
  };
};

export const deleteCartItem = async ({ datas }: DeleteProps) => {
  const response = await fetchWithAuth(`${BASE_URL}/items`, {
    method: 'DELETE',
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
