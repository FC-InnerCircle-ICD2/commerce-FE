import { Card } from '@/components';
import MswTest from '@/components/MswTest';

export default async function Home() {
  const response = await fetch('https://example.com/user');

  const data = await response.json();
  console.log(data);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div style={{ width: '286px' }}>
        <Card
          imgUrl="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
          title="이상해씨"
          price={3000}
          discount={30}
          review={2936}
        />
      </div>
      <MswTest />
    </div>
  );
}
