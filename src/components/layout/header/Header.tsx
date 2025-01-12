import { CategorySearch } from '../../common';
import Navbar from '../Navbar';
import CategoryButton from './CategoryButton';
import Logo from './Logo';
import MobileButtons from './MobileButtons';
import ShoppingButton from './ShoppingButton';

export default function Header() {
  return (
    <header className="w-screen">
      <Navbar />
      <div className="w-full py-4 px-3 justify-between flex items-center tablet:py-10 tablet:px-[100] tablet:shadow-[inset_0px_4px_6px_rgba(0,0,0,0.1)]">
        <div className="flex grow gap-10 items-center">
          <Logo />
          <CategorySearch />
        </div>
        <div className="gap-2 hidden tablet:flex">
          <CategoryButton />
          <ShoppingButton />
        </div>
        <MobileButtons />
      </div>
    </header>
  );
}
