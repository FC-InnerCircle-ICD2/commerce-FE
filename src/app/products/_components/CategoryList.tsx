'use client';

import { useCategory } from '@/hooks/queries/useCategory';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

function CategoryList() {
  const { categories, categoryLoading } = useCategory();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const categoryId = searchParams.get('category');

  const handleCategoryClick = (subCategoryId: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('category', subCategoryId.toString());
    params.delete('name'); // Remove search query when changing category
    router.push(`${pathname}?${params.toString()}`);
  };

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
    <div className="rounded-xl p-8">
      <h2 className="text-lg font-bold mb-5">카테고리</h2>
      <hr />
      <ul className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 gap-2 mt-3">
        {categories?.map((category) => (
          <li key={category.id} className="flex-shrink-0 lg:flex-shrink">
            {category.id === parentCategory?.id && category.subCategories && category.subCategories.length > 0 && (
              <ul>
                {category.subCategories.map((subCategory) => (
                  <li key={subCategory.id}>
                    <button
                      className={`w-full text-left py-2 text-sm ${
                        subCategory.id.toString() === categoryId ? 'text-blue-600 font-bold' : 'text-gray-600'
                      }`}
                      onClick={() => handleCategoryClick(subCategory.id)}
                    >
                      {subCategory.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
