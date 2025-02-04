'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCategory } from '@/hooks/queries/useCategory';

export default function CategoryHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('category');
  const keyword = searchParams.get('name');
  const { categories } = useCategory();

  const getTitle = () => {
    // 카테고리가 없고 검색어가 있는 경우
    if (!categoryId && keyword) {
      return `"${keyword}" 검색 결과`;
    }

    if (!categories || !categoryId) return '카테고리';

    interface Category {
      id: number;
      name: string;
      subCategories?: Category[];
    }

    const findCategory = (cats: Category[]): string | null => {
      for (const cat of cats) {
        if (String(cat.id) === categoryId) return cat.name;
        if (cat.subCategories) {
          const found = findCategory(cat.subCategories);
          if (found) return found;
        }
      }
      return null;
    };

    return findCategory(categories) || '카테고리';
  };

  return (
    <header className="w-full h-[60] flex justify-between items-center px-4 shadow-md">
      <div className="flex gap-5 overflow-hidden min-w-0 flex-1">
        <div onClick={() => router.back()} className="shrink-0">
          <Image src="/assets/arrow.svg" width={24} height={24} alt="arrow" />
        </div>
        <span className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">{getTitle()}</span>
      </div>
    </header>
  );
}
