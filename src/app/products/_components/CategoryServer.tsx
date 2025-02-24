'use client';

import { useCategory } from '@/hooks/queries/useCategory';
import CategoryList from './CategoryList';

export default function CategoryServer() {
  const { categories } = useCategory();

  return <CategoryList categories={categories ?? []} />;
}
