import MswTest from '@/components/MswTest';

export default async function Home() {
  const response = await fetch('https://example.com/user');

  const data = await response.json();
  console.log(data);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <MswTest />
    </div>
  );
}
