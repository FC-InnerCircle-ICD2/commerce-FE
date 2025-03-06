import OrderItemSkeleton from './OrderItemSkeleton';

export default function OrderListSkeleton() {
  return (
    <div className="w-[calc(100%-32px)] lg:w-[calc(100%-200px)] flex flex-col mx-auto">
      <OrderItemSkeleton />
      <OrderItemSkeleton />
      <OrderItemSkeleton />
      <OrderItemSkeleton />
      <OrderItemSkeleton />
    </div>
  );
}
