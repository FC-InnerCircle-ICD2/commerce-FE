'use client';

import { useState } from 'react';
import CartCheckComponent from './CartCheckComponent';
import CartList from './CartList';
import { ICartItem } from '@/api/cart';
import { useCart } from '@/hooks/queries/useCart';
import { useCartDeleteItemMutate } from '@/hooks/mutate/useCartMutate';
import CartSkeleton from '@/components/skeletons/CartSkeleton';
import { useRequireAuth } from '@/hooks/common/useRequireAuth';

export default function CartContainer() {
  useRequireAuth();
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
    const deleteItems: string[] = checkList.map((item) => {
      return item.itemId;
    });
    deleteCartItemMutate({
      itemIds: deleteItems,
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
        {carts?.items.length === 0 && (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500">
            장바구니가 비었습니다
          </div>
        )}
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
    </article>
  );
}
