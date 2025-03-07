'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  handleClose: () => void;
};

export default function MyShoppingModal({ handleClose }: Props) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지 핸들러
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  const handleOrderDetailClick = () => {
    // console.log('주문/배송내역 클릭');
    router.push('/order-detail');
  };

  useEffect(() => {
    // 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트될 때 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div
      ref={modalRef}
      className="w-[180px] h-auto absolute right-0 top-[75px] z-[200] p-[15px] bg-white shadow-lg rounded-lg"
    >
      <div className="flex justify-between items-center">
        <ul className="grow flex flex-col gap-2 overflow-y-auto">
          <li className="w-full h-10 rounded text-sm flex items-center justify-center font-normal text-[#4F4F4F] bg-transparent tablet:text-xs cursor-pointer hover:font-bold hover:bg-[#F1F5F9]">
            <button className="w-full h-full" onClick={handleOrderDetailClick}>
              주문/배송내역
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
