'use client';

import { useState } from 'react';
import ExpandSelect from '@/assets/purchase/expandSelect.png';

interface Props {
  placeholder: string;
  options: string[];
}

export default function WideSelectBox(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const { placeholder, options } = props;

  const openSelectOption = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-1/2">
      <div className="w-full h-12 border border-slate-300 rounded-[10px] bg-white text-sm text-neutral-400 flex justify-between items-center p-5">
        <span className={`${selectedOption && 'text-neutral-800 font-normal'}`}>{selectedOption || placeholder}</span>
        <button onClick={() => openSelectOption()}>
          <img src={ExpandSelect.src} alt="Expand delivery note list" className="w-6 h-6" />
        </button>
      </div>
      {isOpen && (
        <ul className="w-full h-auto rounded-[10px] bg-white flex flex-col px-5 py-3 mt-2 shadow-[0px_10px_15px_rgba(173,173,173,0.25)] absolute">
          {options.map((option, index) => (
            <li key={index} className="font-medium text-sm text-neutral-600">
              <button
                onClick={() => handleSelectOption(option)}
                className="p-2 rounded-md hover:bg-slate-100 hover:text-neutral-800"
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
