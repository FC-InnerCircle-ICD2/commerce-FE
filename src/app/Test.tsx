'use client';

import { IOrder, postOrder } from '@/api/order';

const dummy: IOrder = {
  paymentMethod: 'CARD',
  cardInfo: {
    cardNumber: '1234-5678-9012-3456',
    expirationDate: '12/26',
    cvc: '123',
    cardOwnerName: 'John Doe',
  },
  orderItems: [
    {
      productId: 1,
      productOptionId: 101,
      productName: 'Product A',
      price: 100.5,
      quantity: 2,
    },
  ],
  delivery: {
    name: 'John Doe',
    phoneNumber: '010-1234-5678',
    zonecode: '12345',
    address: 'Seoul, Korea',
    detailAddress: '101 Apartment',
    deliveryMemo: 'Leave at the door',
  },
};

export default function Test() {
  async function handleClickButton() {
    try {
      const result = await postOrder(dummy);
      console.log(result);
    } catch {
      console.error('error');
    }
  }

  return <div onClick={handleClickButton}>test</div>;
}
