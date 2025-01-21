import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function ShoppingButton() {
  return (
    <button className="w-10 h-10 bg-headerMain tablet:w-[65] tablet:h-[65] tablet:bg-transparent rounded-lg flex flex-col items-center justify-center gap-[5] hover:bg-headerMain">
      <ShoppingCartIcon className="w-6 h-6 text-[#075985]" />
      <p className="hidden tablet:block font-medium text-[12px] text-[#075985]">장바구니</p>
    </button>
  );
}
