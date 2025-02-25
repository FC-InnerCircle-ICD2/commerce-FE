'use client';

import ExpandLess from '@/assets/purchase/expandLess.png';
import ExpandMore from '@/assets/purchase/expandMore.png';
import { useState } from 'react';

interface Props {
  title: string | null;
  toggle: boolean;
  toggleTitle?: string;
  margin?: string;
  children: React.ReactNode;
}

export default function TitleBoxContainer(props: Props) {
  const { title, toggle, toggleTitle, margin, children } = props;
  const [isToggle, setIsToggle] = useState(true);

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  return (
    <div className={`w-full ${margin ? margin : 'mb-14'}`}>
      {title && (
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-xl lg:text-2xl">{title}</h3>
          {toggle && (
            <div className="flex items-center gap-2">
              <span className="text-base lg:text-lg font-bold">{toggleTitle}</span>
              <button onClick={() => handleToggle()}>
                {isToggle ? (
                  <img src={ExpandMore.src} alt="Collapse payment method list" className="w-8 h-8" />
                ) : (
                  <img src={ExpandLess.src} alt="Expand payment method list" className="w-8 h-8" />
                )}
              </button>
            </div>
          )}
        </div>
      )}
      {isToggle && (
        <div className="rounded-[.9375rem] border border-slate-300 bg-slate-50 w-full h-auto p-8 flex flex-col">
          {children}
        </div>
      )}
    </div>
  );
}
