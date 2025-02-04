import { getProducts } from '@/api/product';
import { Header } from '@/components/layout';
import CartContainer from './_components/CartContainer';

export default async function Cart() {
  try {
    const products = await getProducts({ sort: 'registration' });

    return (
      <div className="flex flex-col h-screen overflow-x-hidden">
        <Header />
        <CartContainer products={products} />
      </div>
    );
  } catch {
    return <div>error</div>;
  }
}
