'use client';

import PurchaseCarousel from './PurchaseCarousel';
import type { PaymentMethodType, CardInfo } from '@/api/order';

interface Props {
  paymentMethod: PaymentMethodType;
  setCardInfo: React.Dispatch<React.SetStateAction<CardInfo>>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethodType>>;
}

export default function PaymentMethod(props: Props) {
  const { setCardInfo, paymentMethod, setPaymentMethod } = props;

  const isPaymentMethodType = (value: string): value is PaymentMethodType => {
    return ['BANK_TRANSFER', 'CARD', 'KAKAO_PAY', 'TOSS', 'NAVER_PAY'].includes(value as PaymentMethodType);
  };

  const handlePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event.target.value: ', event.target.value);

    if (isPaymentMethodType(event.target.value)) {
      setPaymentMethod(event.target.value);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className={`flex items-center gap-2 ${paymentMethod === 'BANK_TRANSFER' && 'mb-10'}`}>
          <input
            type="radio"
            name="payment"
            id="BANK_TRANSFER"
            value={'BANK_TRANSFER'}
            className="w-5 h-5 lg:w-[25] lg:h-[25]"
            defaultChecked
            onChange={handlePayment}
          />
          <label htmlFor="BANK_TRANSFER" className="ml-2 lg:ml-2.5 text-md lg:text-lg font-medium">
            계좌 간편결제
          </label>
        </div>
        {paymentMethod === 'BANK_TRANSFER' && (
          <div>
            <PurchaseCarousel
              carouselType="account"
              setCardInfo={setCardInfo}
              accounts={[
                {
                  cardNumber: '110-1234-5678',
                  expirationDate: '11/25',
                  cvc: '123',
                  cardOwnerName: '홍길동',
                  bankName: '신한',
                  accountImg: 'https://www.shinhancard.com/pconts/company/images/contents/shc_symbol_ci.png',
                },
                {
                  cardNumber: '110-2222-5678',
                  expirationDate: '11/25',
                  cvc: '123',
                  cardOwnerName: '홍길동',
                  bankName: '국민',
                  accountImg:
                    'https://logo-resources.thevc.kr/organizations/200x200/9722fbb9c8b0ca1eff7d72a15be6eca7e09884a207e7d7707660faecd04d86ae_1646662511432117.jpg',
                },
                {
                  cardNumber: '110-9999-5678',
                  expirationDate: '11/25',
                  cvc: '123',
                  cardOwnerName: '홍길동',
                  bankName: '우리',
                  accountImg:
                    'https://wiki1.kr/images/thumb/9/9a/%EC%9A%B0%EB%A6%AC%EC%9D%80%ED%96%89_%EB%A1%9C%EA%B3%A0.png/200px-%EC%9A%B0%EB%A6%AC%EC%9D%80%ED%96%89_%EB%A1%9C%EA%B3%A0.png',
                },
                {
                  cardNumber: '110-8282-5678',
                  expirationDate: '11/25',
                  cvc: '123',
                  cardOwnerName: '홍길동',
                  bankName: '농협',
                  accountImg:
                    'https://logo-resources.thevc.kr/organizations/200x200/040da1961c1a9b7f7e3d83b079d17fc8a95ad780ab85ff6c35dc17cb44d859ab_1646665315137844.jpg',
                },
              ]}
            />
          </div>
        )}
      </div>
      <hr className="my-[30px]" />
      <div className={`flex items-center gap-2 ${paymentMethod === 'CARD' && 'mb-10'}`}>
        <input
          type="radio"
          name="payment"
          id="CARD"
          value={'CARD'}
          className="w-5 h-5 lg:w-[25] lg:h-[25]"
          onChange={handlePayment}
        />
        <label htmlFor="CARD" className="ml-2 lg:ml-2.5 text-md lg:text-lg font-medium">
          카드 간편결제
        </label>
      </div>
      {paymentMethod === 'CARD' && (
        <div>
          <PurchaseCarousel
            carouselType="card"
            setCardInfo={setCardInfo}
            cards={[
              {
                cardNumber: '1234-5678-1234-5678',
                expirationDate: '12/24',
                cvc: '123',
                cardOwnerName: '홍길동',
                bankName: '신한',
                cardImg: 'https://www.shinhancard.com/_ICSFiles/afieldfile/2020/01/21/pc_card_600x380.png',
              },
              {
                cardNumber: '1234-2345-1234-5678',
                expirationDate: '12/24',
                cvc: '123',
                cardOwnerName: '홍길동',
                bankName: '국민',
                cardImg: 'https://img1.kbcard.com/ST/img/cxc/kbcard/upload/img/product/04240_img.png',
              },
              {
                cardNumber: '1234-5555-1234-5555',
                expirationDate: '12/24',
                cvc: '123',
                cardOwnerName: '홍길동',
                bankName: '하나',
                cardImg: 'https://smart.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_img/10030.png',
              },
              {
                cardNumber: '1234-9999-1234-9999',
                expirationDate: '12/24',
                cvc: '123',
                cardOwnerName: '홍길동',
                bankName: '농협',
                cardImg: 'https://d1c5n4ri2guedi.cloudfront.net/card/499/card_img/21188/499card.png',
              },
            ]}
          />
        </div>
      )}
    </>
  );
}
