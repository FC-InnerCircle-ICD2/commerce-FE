import { getProducts } from '@/api/product';
import MobileFooter from '@/components/layout/footer/MobileFooter';

export default async function Cart() {
  try {
    const products = await getProducts({ sort: 'registration' });

    return (
      <div className="flex flex-col h-screen overflow-x-hidden">
        cart
        <MobileFooter />
      </div>
    );
  } catch {
    return <div>error</div>;
  }
}
