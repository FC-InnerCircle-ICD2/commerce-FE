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
    router.push(`${pathname}?${params.toString()}`);
  };

  // Find parent category by checking all categories and their subcategories
  const findParentCategory = () => {
    for (const category of categories || []) {
      if (category.id.toString() === categoryId) {
        return category;
      }
      const subCategory = category.subCategories?.find((sub) => sub.id.toString() === categoryId);
      if (subCategory) {
        return category;
      }
    }
    return null;
  };

  const parentCategory = findParentCategory();

  return (
    <div className="rounded-xl p-8 bg-slate-50 border border-slate-300 hidden lg:block mb-5">
      <h2 className="text-lg font-bold mb-5">카테고리</h2>
      <hr />
      <ul className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2 mt-3">
        {parentCategory?.subCategories
          ? // 서브카테고리가 있는 경우 서브카테고리만 표시
            parentCategory.subCategories.map((subCategory) => (
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
            ))
          : // 메인 카테고리만 표시
            categories?.map((category) => (
              <li key={category.id} className="flex-shrink-0 lg:flex-shrink">
                <button
                  className={`w-full text-left py-2 text-sm ${
                    category.id.toString() === categoryId ? 'text-blue-600 font-bold' : 'text-gray-600'
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
}

export default CategoryList;
