import { getCategory } from '@/api/category';
import CategoryForm from '@/components/common/CategoryForm';
import MobileFooter from '@/components/layout/footer/MobileFooter';
import CategoryHeader from './_components/CategoryHeader';
import { Suspense } from 'react';

export default async function Category() {
  try {
    const category = await getCategory();

    return (
      <section className="w-screen h-screen flex flex-col">
        <Suspense>
          <CategoryHeader />
        </Suspense>
        <div className="w-full grow p-4">
          <CategoryForm categories={category} />
        </div>
        <MobileFooter />
      </section>
    );
  } catch {
    return <div>Something went wrong while loading the data.</div>;
  }
}
