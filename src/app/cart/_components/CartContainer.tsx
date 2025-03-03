/* eslint-disable no-loss-of-precision */
'use client';

import { useState } from 'react';
import CartCheckComponent from './CartCheckComponent';
import CartList from './CartList';
import { ICartItem, IDeleteItem } from '@/api/cart';
import { useCart } from '@/hooks/queries/useCart';
import { useCartDeleteItemMutate } from '@/hooks/mutate/useCartMutate';
import { useRequireAuth } from '@/hooks/common/useRequireAuth';
import CartSkeleton from '@/components/skeletons/CartSkeleton';

const cartItems: ICartItem[] = [
  {
    productId: '4004470764630528358',
    productName: 'Wireless Headphones',
    price: 100,
    subTotalPrice: 110,
    option: {
      id: 1,
      name: 'Color',
      optionDetail: {
        id: 1,
        value: 'Black',
        quantity: 1,
        additionalPrice: 10,
      },
    },
    images: {
      id: 1,
      url: 'https://emotionalcart-bucket.s3.amazonaws.com/products/4004470764630528359/707d2f542981a49c2c5cf43e200fd608cfb627fb0b5ebfd05cc41f619cd4.jpg',
    },
    provider: {
      id: 1,
      name: 'TechStore',
    },
    selected: true,
  },
];

export default function CartContainer() {
  // useRequireAuth();
  const { carts, cartsLoading } = useCart();
  const [checkList, setCheckList] = useState<ICartItem[]>([]);
  const { deleteCartItemMutate } = useCartDeleteItemMutate();

  function handleChangeCheckList(product: ICartItem) {
    const find = checkList.find((item) => item.productId === product.productId);
    setCheckList(
      find ? [...checkList.filter((item) => item.productId !== product.productId)] : [...checkList, product],
    );
  }

  function handleAllCheckList() {
    if (carts) {
      setCheckList(carts.items.length === checkList.length ? [] : carts.items);
    }
  }

  function handleDeleteCheckList() {
    const deleteItems: IDeleteItem[] = checkList.map((item) => {
      return { productId: item.productId, optionId: item.option.id, optionDetailId: item.option.optionDetail.id };
    });
    deleteCartItemMutate({
      datas: {
        items: [...deleteItems],
      },
    });
  }

  return (
    <article className="w-full h-screen flex flex-col">
      <CartCheckComponent
        isAllCheck={carts?.items.length === checkList.length}
        handleAllCheckList={handleAllCheckList}
        handleDeleteCheckList={handleDeleteCheckList}
      />
      <div className="w-full grow bg-gray-100 flex flex-col gap-[10px] py-4 px-3 pb-[80px] tablet:py-[20px] tablet:px-[100px] tablet:pb-[100px]">
        {cartsLoading && <CartSkeleton />}
        {/* {carts?.items.length === 0 && (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500">
            장바구니가 비었습니다
          </div>
        )} */}
        {cartItems.map((cartItem) => {
          return (
            <CartList
              key={cartItem.productId}
              product={cartItem}
              checkList={checkList}
              handleChangeCheckList={handleChangeCheckList}
            />
          );
        })}
      </div>
    </article>
  );
}
