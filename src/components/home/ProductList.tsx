import { Card } from '../common';

export default function ProductList() {
  return (
    <div className="w-full flex flex-col gap-10 px-3 py-5 tablet:py-10 tablet:px-[100] ">
      <div className="text-2xl font-bold text-center">🔥 당신의 일상을 빛낼 핫한 신상품</div>
      <div className="w-full grid grid-cols-2 grid-rows-2 tablet:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => {
          return (
            <Card
              key={i}
              imgUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png"
              title="test"
              price={3000}
              review={2000}
            />
          );
        })}
      </div>
    </div>
  );
}
