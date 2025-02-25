import { CategorySearch } from '../../common';
import Navbar from '../Navbar';
import CategoryButton from './CategoryButton';
import Logo from './Logo';
import SearchButton from './SearchButton';
import ShoppingButton from './ShoppingButton';

export default function Header() {
  return (
    <header className="w-full">
      <Navbar />
      <div className="w-full max-w-custom mx-auto py-4 px-3 justify-between flex items-center gap-2 tablet:py-10">
        <div className="flex grow items-center gap-2 tablet:gap-10">
          <Logo />
          <CategorySearch />
          <SearchButton />
        </div>
        <div className="flex gap-2">
          <CategoryButton />
          <ShoppingButton />
        </div>
      </div>
    </header>
  );
}
