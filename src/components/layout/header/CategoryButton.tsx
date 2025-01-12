'use client';

import Image from 'next/image';
import { useState } from 'react';
import CategoryForm from './CategoryForm';

export default function CategoryButton() {
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  return (
    <div className="relative">
      <button
        className="w-[65] h-[65] rounded-lg flex flex-col items-center justify-center gap-[5] hover:bg-headerMain"
        onClick={() => setCategoryOpen(true)}
      >
        <Image src="/assets/category.svg" alt="shopping" width={24} height={24} />
        <p className="font-medium text-[12px] text-[#075985]">카테고리</p>
      </button>
      {categoryOpen && <CategoryForm handleCloseForm={() => setCategoryOpen(false)} />}
    </div>
  );
}
