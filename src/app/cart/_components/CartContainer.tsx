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

  function handleDeleteCheckList() {
    console.log(checkList);
    setCheckList([]);
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <CartCheckComponent
        handleAllCheckList={() => setCheckList(products)}
        handleDeleteCheckList={handleDeleteCheckList}
      />
      <div className="w-full grow bg-gray-100 flex flex-col gap-[10px] py-4 px-3 tablet:py-[20px] tablet:px-[100]">
        {products.map((product) => {
          return <CartList key={product.productId} product={product} handleChangeCheckList={handleChangeCheckList} />;
        })}
      </div>
      <CartFooter checkList={checkList} />
    </div>
  );
}
