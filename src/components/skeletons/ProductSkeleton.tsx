import CardSkeleton from './CardSkeleton';

export default function ProductSkeleton() {
  return (
    <div className="w-full flex flex-col gap-10 px-3 py-5 tablet:py-10 tablet:px-[100px] ">
      <div className="text-xl font-bold tablet:text-2xl tablet:text-center">🔥 당신의 일상을 빛낼 핫한 신상품</div>
      <div className="w-full grid grid-cols-2 grid-rows-2 tablet:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => {
          return <CardSkeleton key={i} />;
        })}
      </div>
    </div>
  );
}
