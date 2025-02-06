'use client';

import type { PaymentMethodType } from '@/api/order';

interface Props {
  paymentMethod: PaymentMethodType;
  totalPrice: string;
}

export default function PaymentDetail(props: Props) {
  const { paymentMethod, totalPrice } = props;

  return (
    <div className="flex justify-between items-center">
      <p className="font-medium text-md">{paymentMethod === 'BANK_TRANSFER' ? '계좌 간편결제' : '카드 간편결제'}</p>
      <p className="font-bold text-md">{totalPrice}</p>
    </div>
  );
}
