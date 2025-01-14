import { getCategory } from '@/api/category';
import CategoryHeader from '@/components/categoryPage/CategoryHeader';
import CategoryForm from '@/components/common/CategoryForm';
import MobileFooter from '@/components/layout/footer/MobileFooter';

export default async function Category() {
  try {
    const category = await getCategory();

    return (
      <section className="w-screen h-screen flex flex-col">
        <CategoryHeader />
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
