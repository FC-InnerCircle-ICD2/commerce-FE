'use client';

import type { ICategory } from '@/api/category';
import Image from 'next/image';
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

type Props = {
  categories: ICategory[];
  handleClose?: () => void;
};

export default function CategoryForm({ categories, handleClose }: Props) {
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState<ICategory | null>(null);

  const handleParentCategoryClick = (category: ICategory) => {
    setCurrentCategory(category);
  };

  const handleCategoryItemClick = (category: ICategory) => {
    const params = new URLSearchParams();
    params.append('categoryId', String(category.id));

    router.push(`/products?${params.toString()}`);

    if (handleClose) {
      handleClose();
    }
  };

  return (
    <article className="w-full h-full flex gap-[10]">
      <ul className="w-[160] flex flex-col gap-2 overflow-y-auto">
        {categories.map((category, i) => {
          return (
            <li
              className={`w-full h-10 rounded text-sm flex items-center justify-between p-[10] cursor-pointer tablet:text-xs ${category.id === currentCategory?.id ? 'font-bold text-[#082F49] bg-[#F1F5F9]' : 'font-normal text-[#4F4F4F] bg-transparent'}`}
              key={i}
            >
              <button
                className="w-full outline-none border-none flex items-center justify-between"
                onClick={() => handleParentCategoryClick(category)}
              >
                <MagnifyingGlassIcon className="w-4 h-4 text-[#075985]" />
                <div>{category.name}</div>
                <Image src="/assets/categoryMove.svg" alt="categoryMove" width={20} height={20} />
              </button>
            </li>
          );
        })}
      </ul>
      <div className="w-[1] h-full bg-[#EAEAEA]" />
      <ul className="grow flex flex-col gap-2 overflow-y-auto">
        {currentCategory?.subCategories.map((category, i) => {
          return (
            <li
              className={`w-full h-10 rounded text-sm flex items-center justify-center font-normal text-[#4F4F4F] bg-transparent tablet:text-xs cursor-pointer hover:font-bold hover:bg-[#F1F5F9]`}
              key={i}
            >
              {/* TODO: category 검색 페이지로 전환해야함 */}
              <button className="w-full h-full" onClick={() => handleCategoryItemClick(category)}>
                {category.name}
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
