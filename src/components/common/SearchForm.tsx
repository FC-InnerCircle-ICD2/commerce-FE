'use client';

import useLocalStorage from '@/hooks/common/useLocalStorage';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, forwardRef } from 'react';
import { IOptions } from './Selectbox';

type Props = {
  category?: IOptions;
  classname: string;
  onSearch?: () => void;
  handleCloseSearchView: () => void;
};

const SearchInput = forwardRef<HTMLFormElement, Props>(({ classname, onSearch, handleCloseSearchView }, ref) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useLocalStorage<string[]>('search', []);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const keywordParam = searchParams?.get('keyword');
    if (keywordParam) {
      setInputValue(keywordParam);
    }
  }, [searchParams]);

  const saveSearchTerm = (term: string) => {
    const updatedSearch = [term, ...search.filter((item) => item !== term)];
    setSearch(updatedSearch.slice(0, 5));
  };

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      const params = new URLSearchParams();
      params.append('keyword', inputValue.trim());

      router.push(`/products?${params.toString()}`);
      handleCloseSearchView();
      saveSearchTerm(inputValue.trim());
      onSearch?.();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <form ref={ref} onSubmit={handleSubmit} className={classname}>
      <input
        type="text"
        value={inputValue}
        maxLength={40}
        className="w-full bg-transparent outline-none"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="찾고 싶은 상품을 검색해보세요!"
      />
    </form>
  );
});

export default SearchInput;
