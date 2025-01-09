'use client';

export default function MswTest() {
  const handleGetReviews = () => {
    fetch('http://example.com/client')
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <button onClick={handleGetReviews}>testButton</button>
    </div>
  );
}
