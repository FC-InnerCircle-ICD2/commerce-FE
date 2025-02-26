'use client';

import { useState } from 'react';
import CartCheckComponent from './CartCheckComponent';
import CartList from './CartList';
import CartFooter from './CartFooter';
import { ICartItem } from '@/api/cart';
import { useCart } from '@/hooks/queries/useCart';

export default function CartContainer() {
  const { carts } = useCart();
  const [checkList, setCheckList] = useState<ICartItem[]>([]);

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
    setCheckList([]);
  }

  return (
    <article className="w-full h-screen flex flex-col">
      <CartCheckComponent
        isAllCheck={carts?.items.length === checkList.length}
        handleAllCheckList={handleAllCheckList}
        handleDeleteCheckList={handleDeleteCheckList}
      />
      <div className="w-full grow bg-gray-100 flex flex-col gap-[10px] py-4 px-3 pb-[80px] tablet:py-[20px] tablet:px-[100px] tablet:pb-[100px]">
        {carts?.items.map((cartItem) => {
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
      <CartFooter checkList={checkList} />
    </article>
  );
}
