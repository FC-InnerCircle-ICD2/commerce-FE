'use client';

import useLocalStorage from '@/hooks/common/useLocalStorage';
import { useState } from 'react';

type Props = {
  classname: string;
};

export default function SearchInput({ classname }: Props) {
  const [inputValue, setInputValue] = useState<string>('');
  const [search, setSearch] = useLocalStorage<string[]>('search', []);

  const handleEnter = (event: React.KeyboardEvent) => {
    /**
     * IME는 영어가 아닌 한글, 일본어, 중국어와 같은 언어를 다양한 브라우저에서 지원하도록 언어를 변환시켜주기 위한 OS 단계의 어플리케이션을 말한다.
     * 그러나 IME 과정에서 keydown 이벤트가 발생하면, OS와 브라우저에서 해당 이벤트를 모두 처리하기 때문에 keydown 이벤트가 중복으로 발생하게 되는 것이다.
     * => keydown에 한글 입력시 2번 호출되는 이슈 방지하기 위한 isComposing 추가
     */
    if (event.nativeEvent.isComposing) return;
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setSearch([...search, inputValue]);
      setInputValue('');
    }
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleEnter}
      className={classname}
      placeholder="찾고 싶은 상품을 검색해보세요!"
    />
  );
}
