'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { SORT_OPTIONS } from '@/api/product';

import SortDropdown from './SortDropdown';

interface SortOption {
  value: SORT_OPTIONS;
  label: string;
}

const SORT_OPTIONS_CONFIG: SortOption[] = [
  { value: 'PRICE_ASC', label: '낮은가격순' },
  { value: 'PRICE_DESC', label: '높은가격순' },
  { value: 'SALES_DESC', label: '판매량순' },
  { value: 'CREATE_DESC', label: '등록순' },
];

export default function Breadcrumbs() {
  const [selectedSort, setSelectedSort] = useState<SORT_OPTIONS>('PRICE_ASC');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const query = searchParams.get('name');
    setSearchQuery(query ? decodeURIComponent(query) : '');
  }, [searchParams]); // Update searchQuery when URL parameters change

  const getCurrentSortLabel = (value: SORT_OPTIONS): string => {
    return SORT_OPTIONS_CONFIG.find((option) => option.value === value)?.label ?? '';
  };

  const getSortValueByLabel = (label: string): SORT_OPTIONS => {
    return SORT_OPTIONS_CONFIG.find((option) => option.label === label)?.value ?? 'CREATE_DESC';
  };

  const handleSortChange = (label: string) => {
    const sortValue = getSortValueByLabel(label);
    setSelectedSort(sortValue);

    const params = new URLSearchParams(searchParams);
    params.set('sortOption', sortValue);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between lg:px-7 lg:py-4 px-3 py-2 bg-slate-50 lg:border border-slate-300 lg:rounded-xl">
      <div className="flex items-center">
        {searchQuery && (
          <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-slate-200 shadow-sm">
            <span className="text-slate-500 text-sm font-medium">검색어:</span>
            <span className="text-slate-700 text-sm">{searchQuery}</span>
          </div>
        )}
      </div>
      <SortDropdown
        label={getCurrentSortLabel(selectedSort)}
        items={SORT_OPTIONS_CONFIG.map((option) => option.label)}
        onSelect={handleSortChange}
      />
    </div>
  );
}
