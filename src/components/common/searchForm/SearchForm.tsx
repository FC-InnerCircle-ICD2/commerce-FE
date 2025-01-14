import SearchFormButton from './SearchFormButton';
import SearchFormList from './SearchFormList';

type Props = {
  recommend: string[];
  handleClose: () => void;
};

export default function SearchForm({ recommend, handleClose }: Props) {
  const searchs = localStorage.getItem('searchs');
  console.log(searchs);
  return (
    <article className="w-full p-4 flex flex-col gap-[25]">
      <div className="w-full flex justify-between text-sm">
        <span className="text-[#4F4F4F]">최근 검색어</span>
        <span className="text-[#949494]">전체 삭제</span>
      </div>
      <ul className="w-full flex flex-col gap-5">
        {['나가사키 카스테라', '호날두', '메시'].map((item, i) => {
          return <SearchFormList key={i} search={item} />;
        })}
      </ul>
      <label className="text-sm text-[#4F4F4F]">추천 검색어</label>
      <div className="w-full flex flex-wrap">
        {recommend.map((item, i) => {
          return <SearchFormButton key={i} title={item} />;
        })}
      </div>
      <div className="w-full border-t border-[#EFEFEF] flex items-end">
        <span className="text-sm font-bold text-[#949494]" onClick={handleClose}>
          닫기
        </span>
      </div>
    </article>
  );
}
