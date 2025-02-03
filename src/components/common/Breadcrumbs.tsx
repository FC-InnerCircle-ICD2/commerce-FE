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
import { SORT_OPTIONS } from '@/api/product';
import { useRouter, useSearchParams } from 'next/navigation';

import SortDropdown from './SortDropdown';

interface BreadcrumbDropdownProps {
  label: string;
  items: string[];
  onSelect: (item: string) => void;
}

interface SortOption {
  value: SORT_OPTIONS;
  label: string;
}

const categoryItems = {
  clothing: ['상의', '하의', '아우터'],
  outer: ['코트', '자켓', '패딩'],
};

const SORT_OPTIONS_CONFIG: SortOption[] = [
  { value: 'PRICE_ASC', label: '낮은가격순' },
  { value: 'PRICE_DESC', label: '높은가격순' },
  { value: 'SALES_DESC', label: '판매량순' },
  { value: 'CREATE_DESC', label: '등록순' },
];

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('남성의류');
  const [selectedOuter, setSelectedOuter] = useState<string>('아우터');
  const [selectedSort, setSelectedSort] = useState<SORT_OPTIONS>(() => {
    const sortFromUrl = searchParams.get('sortOption') as SORT_OPTIONS;
    return sortFromUrl && Object.values(SORT_OPTIONS_CONFIG).some((option) => option.value === sortFromUrl)
      ? sortFromUrl
      : 'PRICE_ASC';
  });

  const getCurrentSortLabel = (value: SORT_OPTIONS): string => {
    return SORT_OPTIONS_CONFIG.find((option) => option.value === value)?.label ?? '';
  };

  const getSortValueByLabel = (label: string): SORT_OPTIONS => {
    return SORT_OPTIONS_CONFIG.find((option) => option.label === label)?.value ?? 'CREATE_DESC';
  };

  return (
    <div className="flex items-center justify-between lg:px-7 lg:py-4 px-3 py-2 bg-slate-50 lg:border border-slate-300 lg:rounded-xl">
      <Breadcrumb className="flex items-center gap-2 list-none">
        <BreadcrumbItem className="border border-slate-300 rounded-full bg-white px-3 py-2 text-sm text-nowrap">
          <BreadcrumbLink href="/">홈</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRightIcon className="w-6 h-6" />
        </BreadcrumbSeparator>
        <BreadcrumbItem className="border border-slate-300 rounded-full bg-white px-1 py-2 text-sm text-nowrap">
          <BreadcrumbDropdown label={selectedCategory} items={categoryItems.clothing} onSelect={setSelectedCategory} />
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <ChevronRightIcon className="w-6 h-6" />
        </BreadcrumbSeparator>
        <BreadcrumbItem className="border border-slate-300 rounded-full bg-white px-1 py-2 text-sm text-nowrap">
          <BreadcrumbDropdown label={selectedOuter} items={categoryItems.outer} onSelect={setSelectedOuter} />
        </BreadcrumbItem>
      </Breadcrumb>
      <SortDropdown
        label={getCurrentSortLabel(selectedSort)}
        items={SORT_OPTIONS_CONFIG.map((option) => option.label)}
        onSelect={(label: string) => {
          const sortValue = getSortValueByLabel(label);
          setSelectedSort(sortValue);

          // URL 업데이트
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.set('sortOption', sortValue);
          router.push(`?${newSearchParams.toString()}`);
        }}
      />
    </div>
  );
}
