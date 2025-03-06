import type { OrderContent } from '../page';
import OrderItem from './OrderItem';

interface Props {
  orders: Array<OrderContent>;
}

export default function OrderItemList(props: Props) {
  const { orders } = props;

  if (!orders) {
    throw new Promise(() => {});
  }

  return (
    <div className="w-[calc(100%-32px)] lg:w-[calc(100%-200px)] flex flex-col mx-auto">
      {orders.length > 0 ? (
        orders.map((orderInfo: OrderContent) => <OrderItem orderInfo={orderInfo} key={orderInfo.orderId} />)
      ) : (
        <div className="text-center py-10 text-gray-500">주문 내역이 없습니다.</div>
      )}
    </div>
  );
}
