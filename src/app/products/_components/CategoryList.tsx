'use client';

import { useCategory } from '@/hooks/queries/useCategory';
import LoadingSpinner from '@/components/common/LoadingSpinner';

function CategoryList() {
  const { categories, categoryLoading } = useCategory();

  if (categoryLoading) {
    return (
      <div className="rounded-xl p-8">
        <h2 className="text-lg font-bold mb-5">카테고리</h2>
        <hr />
        <div className="py-5">
          <LoadingSpinner size={30} />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-8">
      <h2 className="text-lg font-bold mb-5">카테고리</h2>
      <hr />
      <ul className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2 mt-3">
        {categories?.map((category) => (
          <li key={category.id} className="flex-shrink-0 lg:flex-shrink">
            <button className="w-full text-left py-2">{category.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
