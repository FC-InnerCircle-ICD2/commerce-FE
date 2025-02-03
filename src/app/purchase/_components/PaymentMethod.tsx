'use client';

import PurchaseCarousel from './PurchaseCarousel';
import { usePaymentStore } from '@/store/paymentStore';

export default function PaymentMethod() {
  const payment = usePaymentStore((state) => state.payment);
  const pickedAccount = usePaymentStore((state) => state.pickedAccount);
  const pickedCard = usePaymentStore((state) => state.pickedCard);

  const handlePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === 'account') {
      pickedAccount();
    } else {
      pickedCard();
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className={`flex items-center gap-2 ${payment === 'account' && 'mb-10'}`}>
          <input
            type="radio"
            name="payment"
            id="account"
            value={'account'}
            className="w-5 h-5 lg:w-[25] lg:h-[25]"
            defaultChecked
            onChange={handlePayment}
          />
          <label htmlFor="account" className="ml-2 lg:ml-2.5 text-md lg:text-lg font-medium">
            계좌 간편결제
          </label>
        </div>
        {payment === 'account' && (
          <div>
            <PurchaseCarousel
              carouselType="account"
              accounts={[
                {
                  bank: '신한',
                  accountNumber: '110-1234-5678',
                  accountImg: 'https://www.shinhancard.com/pconts/company/images/contents/shc_symbol_ci.png',
                },
                {
                  bank: '국민',
                  accountNumber: '110-1234-5678',
                  accountImg:
                    'https://logo-resources.thevc.kr/organizations/200x200/9722fbb9c8b0ca1eff7d72a15be6eca7e09884a207e7d7707660faecd04d86ae_1646662511432117.jpg',
                },
                {
                  bank: '우리',
                  accountNumber: '110-1234-5678',
                  accountImg:
                    'https://wiki1.kr/images/thumb/9/9a/%EC%9A%B0%EB%A6%AC%EC%9D%80%ED%96%89_%EB%A1%9C%EA%B3%A0.png/200px-%EC%9A%B0%EB%A6%AC%EC%9D%80%ED%96%89_%EB%A1%9C%EA%B3%A0.png',
                },
                {
                  bank: '농협',
                  accountNumber: '110-1234-5678',
                  accountImg:
                    'https://logo-resources.thevc.kr/organizations/200x200/040da1961c1a9b7f7e3d83b079d17fc8a95ad780ab85ff6c35dc17cb44d859ab_1646665315137844.jpg',
                },
              ]}
            />
          </div>
        )}
      </div>
      <hr className="my-[30px]" />
      <div className={`flex items-center gap-2 ${payment === 'card' && 'mb-10'}`}>
        <input
          type="radio"
          name="payment"
          id="card"
          value={'card'}
          className="w-5 h-5 lg:w-[25] lg:h-[25]"
          onChange={handlePayment}
        />
        <label htmlFor="card" className="ml-2 lg:ml-2.5 text-md lg:text-lg font-medium">
          카드 간편결제
        </label>
      </div>
      {payment === 'card' && (
        <div>
          <PurchaseCarousel
            carouselType="card"
            cards={[
              {
                cardName: '신한',
                cardNumber: '1234-5678-1234-5678',
                cardImg: 'https://www.shinhancard.com/_ICSFiles/afieldfile/2020/01/21/pc_card_600x380.png',
              },
              {
                cardName: '국민',
                cardNumber: '1234-5678-1234-5678',
                cardImg: 'https://img1.kbcard.com/ST/img/cxc/kbcard/upload/img/product/04240_img.png',
              },
              {
                cardName: '하나',
                cardNumber: '1234-5678-1234-5678',
                cardImg: 'https://smart.hanacard.co.kr/ATTACH/NEW_HOMEPAGE/images/cardinfo/card_img/10030.png',
              },
              {
                cardName: '농협',
                cardNumber: '1234-5678-1234-5678',
                cardImg: 'https://d1c5n4ri2guedi.cloudfront.net/card/499/card_img/21188/499card.png',
              },
            ]}
          />
        </div>
      )}
    </>
  );
}
