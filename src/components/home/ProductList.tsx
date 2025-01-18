import { Card } from '../common';

export default function ProductList() {
  return (
    <div className="w-full px-3 py-5 grid grid-cols-4 grid-rows-2 gap-4">
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
  );
}
