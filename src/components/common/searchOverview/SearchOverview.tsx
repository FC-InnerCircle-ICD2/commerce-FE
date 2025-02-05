'use client';

import useLocalStorage from '@/hooks/common/useLocalStorage';
import SearchOverviewList from './SearchOverviewList';
import { RefObject, useEffect } from 'react';

type Props = {
  parentRef: RefObject<HTMLDivElement | null>;
  recommend?: string[];
  handleClose: () => void;
};

export default function SearchOverview({ parentRef, handleClose }: Props) {
  const [search, setSearch] = useLocalStorage<string[]>('search', []);

  const handleClickOutside = (event: MouseEvent) => {
    if (parentRef.current && !parentRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    // 이벤트 리스너 등록
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 컴포넌트가 언마운트될 때 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoveSearch = (remove: string) => {
    setSearch([...search.filter((item) => item !== remove)]);
  };

  return (
    <article className="w-full p-4 flex flex-col gap-[25]">
      <div className="w-full flex justify-between text-sm">
        <span className="text-[#4F4F4F]">최근 검색어</span>
        <span className="text-[#949494] cursor-pointer" onClick={() => setSearch([])}>
          전체 삭제
        </span>
      </div>
      <ul className="w-full flex flex-col gap-5">
        {search.length === 0 && (
          <div className="w-full text-center text-[#404040] font-bold">최근 검색 결과가 없습니다.</div>
        )}
        {search.map((item: string, i: number) => {
          return (
            <SearchOverviewList
              key={i}
              search={item}
              handleRemoveSearch={handleRemoveSearch}
              handleClose={handleClose}
            />
          );
        })}
      </ul>
      {/* TODO: 추후 MVP 후 추천 검색어 작업 필요 */}
      {/* <label className="text-sm text-[#4F4F4F]">추천 검색어</label>
      <div className="w-full flex flex-wrap">
        {recommend.map((item, i) => {
          return <SearchOverviewButton key={i} title={item} />;
        })}
      </div> */}
      <div className="w-full border-t border-[#EFEFEF] flex justify-end pt-5">
        <span className="text-sm font-bold text-[#949494] cursor-pointer" onClick={handleClose}>
          닫기
        </span>
      </div>
    </article>
  );
}
