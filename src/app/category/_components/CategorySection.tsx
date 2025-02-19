'use client';

import CategoryForm from '@/components/common/CategoryForm';
import { useCategory } from '@/hooks/queries/useCategory';

export default function CategorySection() {
  const { categories } = useCategory();
  return (
    <div className="w-full grow p-4">
      <CategoryForm categories={categories ?? []} />
    </div>
  );
}
