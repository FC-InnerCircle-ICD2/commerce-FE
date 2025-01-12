'use client';

export default function MswTest() {
  const handleGetReviews = () => {
    fetch('http://example.com/client')
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handlePostTest = () => {
    fetch('http://example.com/posts', {
      method: 'post',
      body: JSON.stringify({ id: 'id123', value: '아이디입니다' }),
    }).then((res) => res.json());
  };

  return (
    <div className="flex flex-col gap-4">
      <button onClick={handleGetReviews}>getTestButton</button>
      <button onClick={handlePostTest}>postTest</button>
    </div>
  );
}
