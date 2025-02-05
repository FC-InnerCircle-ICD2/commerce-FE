export default async function Test({ searchParams }: { searchParams: { data?: string } }) {
  if (!searchParams.data) {
    return <p>No order data found.</p>;
  }

  let orderData;
  try {
    orderData = JSON.parse(decodeURIComponent(searchParams.data));
  } catch (error) {
    console.error('Decoding error:', error);
    return <p>Error: Invalid order data</p>;
  }

  console.log(orderData);
  return <>test</>;
}
