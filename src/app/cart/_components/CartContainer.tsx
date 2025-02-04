'use client';

import { IProduct } from '@/api/product';
import { useState } from 'react';
import CartCheckComponent from './CartCheckComponent';
import CartList from './CartList';
import CartFooter from './CartFooter';

type Props = {
  products: IProduct[];
};

export default function CartContainer({ products }: Props) {
  const [checkList, setCheckList] = useState<IProduct[]>([]);

  function handleChangeCheckList(product: IProduct) {
    const find = checkList.find((item) => item.productId === product.productId);
    setCheckList(
      find ? [...checkList.filter((item) => item.productId !== product.productId)] : [...checkList, product],
    );
  }

  function handleAllCheckList() {
    setCheckList(products.length === checkList.length ? [] : products);
  }

  function handleDeleteCheckList() {
    console.log(checkList);
    setCheckList([]);
  }

  return (
    <article className="w-full h-screen flex flex-col">
      <CartCheckComponent
        isAllCheck={products.length === checkList.length}
        handleAllCheckList={handleAllCheckList}
        handleDeleteCheckList={handleDeleteCheckList}
      />
      <div className="w-full grow bg-gray-100 flex flex-col gap-[10px] py-4 px-3 pb-[80px] tablet:py-[20px] tablet:px-[100px] tablet:pb-[100px]">
        {products.map((product) => {
          return (
            <CartList
              key={product.productId}
              product={product}
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
