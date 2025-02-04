'use client';

import { usePaymentStore } from '@/store/paymentStore';

export default function PaymentDetail() {
  const payment = usePaymentStore((state) => state.payment);

  return (
    <div className="flex justify-between items-center">
      <p className="font-medium text-md">{payment === 'account' ? '계좌 간편결제' : '카드 간편결제'}</p>
      <p className="font-bold text-md">86,700원</p>
    </div>
  );
}
