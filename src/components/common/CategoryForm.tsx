'use client';

import { ICategory } from '@/api/category';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  categories: ICategory[];
};

export default function CategoryForm({ categories }: Props) {
  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(null);

  const handleParentCategoryClick = (category: ICategory) => {
    setCurrentCategory(category);
  };

  return (
    <article className="w-full h-full flex gap-[10]">
      <ul className="w-[160] flex flex-col gap-2">
        {categories?.map((category, i) => {
          return (
            <li
              className={`w-full h-10 rounded text-sm flex items-center justify-between p-[10] ${category.productCategoryId === currentCategory?.productCategoryId ? 'font-bold text-[#082F49] bg-[#F1F5F9]' : 'font-normal text-[#4F4F4F] bg-transparent'}`}
              key={i}
              onClick={() => handleParentCategoryClick(category)}
            >
              <Image src="/assets/search.svg" alt="icon" width={24} height={24} />
              <div>{category.name}</div>
              <Image src="/assets/categoryMove.svg" alt="categoryMove" width={20} height={20} />
            </li>
          );
        })}
      </ul>
      <div className="w-[1] h-full bg-[#EAEAEA]" />
      <ul className="grow flex flex-col gap-2">
        {currentCategory?.subCategories.map((category, i) => {
          return (
            <li
              className={`w-full h-10 rounded text-sm flex items-center justify-center font-normal text-[#4F4F4F] bg-transparent hover:(font-bold bg-[#F1F5F9])`}
              key={i}
              onClick={() => console.log(category)}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
