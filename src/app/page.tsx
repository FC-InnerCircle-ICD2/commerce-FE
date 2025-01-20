import { getBanners } from '@/api/banner';
import { getProducts } from '@/api/product';
import Carousel from '@/components/home/Carousel';
import ProductList from '@/components/home/ProductList';
import { Header } from '@/components/layout';
import MobileFooter from '@/components/layout/footer/MobileFooter';

export default async function Home() {
  try {
    const banners = await getBanners();
    const products = await getProducts({ sort: 'registration' });

    return (
      <div className="flex flex-col h-screen overflow-x-hidden">
        <Header />
        <div className="grow flex flex-col gap-[20]">
          <Carousel banners={banners} />
          <ProductList products={products} />
        </div>
        <MobileFooter />
      </div>
    );
  } catch {
    return <div>error</div>;
  }
}
