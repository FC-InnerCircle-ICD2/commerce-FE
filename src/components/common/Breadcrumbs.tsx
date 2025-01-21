'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import SortDropdown from './SortDropdown';

interface BreadcrumbDropdownProps {
  label: string;
  items: string[];
  onSelect: (item: string) => void;
}

function BreadcrumbDropdown({ label, items, onSelect }: BreadcrumbDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex items-center gap-1 outline-none">
        <button className="px-2">
          {label}
          <Image src="/assets/dropdownDown.svg" width={20} height={20} alt="dropdown arrow" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {items.map((item) => (
          <DropdownMenuItem key={item} onSelect={() => onSelect(item)}>
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Breadcrumbs() {
  const [selectedCategory, setSelectedCategory] = useState<string>('남성의류');
  const [selectedOuter, setSelectedOuter] = useState<string>('아우터');
  const [selectedSort, setSelectedSort] = useState<string>('낮은 가격순');

  const categoryItems = {
    clothing: ['상의', '하의', '아우터'],
    outer: ['코트', '자켓', '패딩'],
  };

  const sortItems = ['높은 가격순', '판매 많은순', '등록순'];

  return (
    <div className="flex items-center justify-between px-7 py-4 bg-slate-50 border border-slate-300 rounded-xl">
      <Breadcrumb className="flex items-center gap-2 list-none">
        <BreadcrumbItem className="border border-slate-300 rounded-full bg-white px-3 py-2">
          <BreadcrumbLink href="/">홈</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRightIcon className="w-6 h-6" />
        </BreadcrumbSeparator>
        <BreadcrumbItem className="border border-slate-300 rounded-full bg-white px-1 py-2">
          <BreadcrumbDropdown label={selectedCategory} items={categoryItems.clothing} onSelect={setSelectedCategory} />
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRightIcon className="w-6 h-6" />
        </BreadcrumbSeparator>
        <BreadcrumbItem className="border border-slate-300 rounded-full bg-white px-1 py-2">
          <BreadcrumbDropdown label={selectedOuter} items={categoryItems.outer} onSelect={setSelectedOuter} />
        </BreadcrumbItem>
      </Breadcrumb>
      <SortDropdown label={selectedSort} items={sortItems} onSelect={setSelectedSort} />
    </div>
  );
}
