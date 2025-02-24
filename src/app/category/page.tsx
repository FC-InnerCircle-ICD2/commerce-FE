import CategoryHeader from './_components/CategoryHeader';
import { Suspense } from 'react';
import CategorySection from './_components/CategorySection';

export default async function Category() {
  return (
    <section className="w-screen h-screen flex flex-col">
      <Suspense>
        <CategoryHeader />
      </Suspense>
      <CategorySection />
    </section>
  );
}
