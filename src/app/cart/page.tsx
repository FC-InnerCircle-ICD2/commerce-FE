import { Header } from '@/components/layout';
import CartContainer from './_components/CartContainer';

export default async function Cart() {
  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      <Header />
      <CartContainer />
    </div>
  );
}
