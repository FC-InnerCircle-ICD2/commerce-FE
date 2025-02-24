'use client';

import { ICategory } from '@/api/category';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface CategoryListProps {
  categories: ICategory[];
}

function CategoryList({ categories }: CategoryListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const categoryId = searchParams?.get('categoryId');

  const handleCategoryClick = (categoryId: number) => {
    const params = new URLSearchParams();
    params.set('categoryId', categoryId.toString());

    // 검색어가 있는 경우 유지
    const keyword = searchParams?.get('keyword');
    if (keyword) {
      params.set('keyword', keyword);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="rounded-xl p-8 bg-slate-50 border border-slate-300 hidden lg:block mb-5">
      <h2 className="text-lg font-bold mb-5">카테고리</h2>
      <hr />
      <ul className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2 mt-3">
        {categories?.map((category) =>
          category.subCategories?.map((subCategory) => (
            <li key={subCategory.id} className="flex-shrink-0 lg:flex-shrink">
              <button
                className={`w-full text-left py-2 text-sm ${
                  subCategory.id.toString() === categoryId ? 'text-blue-600 font-bold' : 'text-gray-600'
                }`}
                onClick={() => handleCategoryClick(subCategory.id)}
              >
                {subCategory.name}
              </button>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

export default CategoryList;
