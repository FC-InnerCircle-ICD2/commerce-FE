'use client';

import MyShoppingModal from '@/components/modals/MyShoppingModal';
import Image from 'next/image';
import { useState } from 'react';

export default function MyShoppingButton() {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  return (
    <div className="relative hidden tablet:block">
      <button
        className={`w-[65px] h-[65px] rounded-lg flex flex-col items-center justify-center gap-[5px] ${dropdownOpen && 'bg-headerMain'} hover:bg-headerMain`}
        onClick={() => setDropdownOpen(true)}
      >
        <Image src="/assets/user.svg" alt="my shopping" width={24} height={24} />
        <p className="font-medium text-[12px] text-[#075985]">마이쇼핑</p>
      </button>
      {dropdownOpen && <MyShoppingModal handleClose={() => setDropdownOpen(false)} />}
    </div>
  );
}
