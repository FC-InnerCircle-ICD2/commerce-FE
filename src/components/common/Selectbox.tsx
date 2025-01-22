'use client';

import { useEffect, useRef, useState } from 'react';
import Vector from '@/assets/vector.png';

export interface IOptions {
  label: string;
  value: string;
}

type Props = {
  width: string;
  currentItem: IOptions;
  items: IOptions[];
  handleChangeSelect: (item: IOptions) => void;
};

export default function Selectbox({ width, currentItem, items, handleChangeSelect }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지 핸들러
  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setOpen(false); // SelectBox 닫기
    }
  };

  useEffect(() => {
    // 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트될 때 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} onClick={() => setOpen(!open)} style={{ width: `${width}px` }} className="relative">
      <button className=" pl-5 pr-1 flex items-center justify-between w-full border-none">
        <p>{currentItem.label}</p>
        <img className={`w-[30] h-[30] ${open ? 'rotate-180' : ''}`} src={Vector.src} alt="vector" />
      </button>
      {open && (
        <ul
          className={`absolute w-full top-[50px] p-[5] bg-white shadow-[0px_0px_4px_0px_rgba(0,0,0,0.75)] rounded-xl overflow-hidden ${open ? 'animate-fadeIn' : 'animate-fadeOut'}`}
        >
          {items.map((item, i) => {
            return (
              <li
                className="w-full h-[30] p-2 text-[#4F4F4F] pl-[15] rounded-md text-xs hover:bg-[#f3f3f3] hover:font-bold"
                key={i}
              >
                <button
                  className="w-full h-full flex items-start cursor-pointer"
                  onClick={() => handleChangeSelect(item)}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
