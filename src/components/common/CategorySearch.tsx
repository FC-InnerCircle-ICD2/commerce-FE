'use client';

import Selectbox, { IOptions } from './Selectbox';
import { useEffect, useMemo, useRef, useState } from 'react';
import SearchForm from './searchForm/SearchForm';
import SearchInput from './SearchInput';
import { useCategory } from '@/hooks/queries/useCategory';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function CategorySearch() {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const [currentItem, setCurrentItem] = useState<IOptions>({ label: '', value: '' });
  const { categories } = useCategory();
  const categoryOptions: IOptions[] = useMemo(() => {
    if (!categories) return [];
    return categories.map((item) => {
      return { label: item.name, value: String(item.id) };
    });
  }, [categories]);

  useEffect(() => {
    if (categoryOptions.length > 0) {
      setCurrentItem(categoryOptions[0]);
    }
  }, [categoryOptions]);

  return (
    <div
      ref={parentRef}
      className="grow max-w-[550] text-sm h-[50] py-1 gap-[10] bg-headerMain rounded-lg hidden items-center tablet:flex tablet:relative"
    >
      <Selectbox width="120" currentItem={currentItem} items={categoryOptions} handleChangeSelect={setCurrentItem} />
      <div className="relative flex grow pr-[10]" onFocus={() => setIsFocus(true)}>
        <SearchInput
          category={currentItem}
          classname="grow border-l-2 border-[#CBD5E1] pl-[15] text-[#3D3D3D] bg-transparent outline-none"
        />
        <MagnifyingGlassIcon className="w-[25px] h-[25px] text-[#075985]" />
        {isFocus && (
          <article className="absolute z-50 left-0 top-[50] w-full bg-white rounded-md shadow-md">
            <SearchForm parentRef={parentRef} recommend={['추천']} handleClose={() => setIsFocus(false)} />
          </article>
        )}
      </div>
    </div>
  );
}
