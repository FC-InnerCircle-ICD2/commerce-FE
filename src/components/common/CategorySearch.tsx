'use client';

import Selectbox, { type IOptions } from './Selectbox';
import { useEffect, useMemo, useRef, useState } from 'react';
import SearchOverview from './searchOverview/SearchOverview';
import SearchForm from './SearchForm';
import { useCategory } from '@/hooks/queries/useCategory';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import LoadingSpinner from './LoadingSpinner';

export default function CategorySearch() {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const parentRef = useRef<HTMLDivElement>(null);
  const [currentItem, setCurrentItem] = useState<IOptions>({ label: '', value: '' });
  const { categories, categoryLoading } = useCategory();
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

  function handleCloseSearchView() {
    if (isFocus) {
      setIsFocus(false);
    }
  }

  return (
    <div
      ref={parentRef}
      className="grow max-w-[550] text-sm h-[50] py-1 gap-[10] bg-headerMain rounded-lg hidden items-center tablet:flex tablet:relative"
    >
      {categoryLoading ? (
        <div className="w-[120px]">
          <LoadingSpinner size={30} />
        </div>
      ) : (
        <Selectbox width="120" currentItem={currentItem} items={categoryOptions} handleChangeSelect={setCurrentItem} />
      )}
      <div className="relative flex grow pr-[10]" onFocus={() => setIsFocus(true)}>
        <SearchForm
          category={currentItem}
          classname="grow border-l-2 border-[#CBD5E1] pl-[15] text-[#3D3D3D] bg-transparent outline-none"
          handleCloseSearchView={handleCloseSearchView}
        />
        <MagnifyingGlassIcon className="w-[25px] h-[25px] text-[#075985]" />
        {isFocus && (
          <article className="absolute z-50 left-0 top-[50] w-full bg-white rounded-md shadow-md">
            <SearchOverview parentRef={parentRef} recommend={['추천']} handleClose={() => setIsFocus(false)} />
          </article>
        )}
      </div>
    </div>
  );
}
