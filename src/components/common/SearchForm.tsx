'use client';

import useLocalStorage from '@/hooks/common/useLocalStorage';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { IOptions } from './Selectbox';

type Props = {
  category?: IOptions;
  classname: string;
  onSearch?: () => void;
};

export default function SearchInput({ category, classname, onSearch }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useLocalStorage<string[]>('search', []);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const nameParam = searchParams.get('name');
    if (nameParam) {
      setInputValue(nameParam);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      const params = new URLSearchParams();
      if (category?.value) {
        params.append('category', category.value);
      }
      params.append('name', inputValue.trim());

      router.push(`/products?${params.toString()}`);
      setSearch([...search, inputValue]);
      onSearch?.();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    /**
     * IME는 영어가 아닌 한글, 일본어, 중국어와 같은 언어를 다양한 브라우저에서 지원하도록 언어를 변환시켜주기 위한 OS 단계의 어플리케이션을 말한다.
     * 그러나 IME 과정에서 keydown 이벤트가 발생하면, OS와 브라우저에서 해당 이벤트를 모두 처리하기 때문에 keydown 이벤트가 중복으로 발생하게 되는 것이다.
     * => keydown에 한글 입력시 2번 호출되는 이슈 방지하기 위한 isComposing 추가
     */
    event.preventDefault(); // 기본 제출 동작 방지

    if (inputValue.trim() !== '') {
      handleSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classname}>
      <input
        type="text"
        value={inputValue}
        className="w-full bg-transparent outline-none"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="찾고 싶은 상품을 검색해보세요!"
      />
    </form>
  );
}
