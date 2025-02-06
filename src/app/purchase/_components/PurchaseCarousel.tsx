'use client';

import { Carousel } from 'ji-react-carousel';
import CarouselLeft from '@/assets/purchase/carouselLeft.png';
import CarouselRight from '@/assets/purchase/carouselRight.png';
import AccountBlock from './AccountBlock';
import CardBlock from './CardBlock';
import type { CardInfo } from '@/api/order';

interface Account {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  cardOwnerName: string;
  bankName?: string;
  accountImg?: string;
}

interface Card {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  cardOwnerName: string;
  cardImg: string;
  bankName?: string;
}

interface Props {
  accounts?: Account[];
  cards?: Card[];
  setCardInfo: React.Dispatch<React.SetStateAction<CardInfo>>;
  carouselType: 'account' | 'card';
}

export default function PurchaseCarousel(props: Props) {
  const { accounts = [], cards = [], carouselType, setCardInfo } = props;

  return (
    <Carousel
      width={200}
      viewCount={3}
      LeftArrow={
        <button className="w-8 h-8 bg-white rounded-full border border-neutral-300 flex items-center justify-center">
          <img className="w-5 h-5" src={CarouselLeft.src} alt="Carousel left arrow" />
        </button>
      }
      RightArrow={
        <button className="w-8 h-8 bg-white rounded-full border border-neutral-300 flex items-center justify-center">
          <img className="w-5 h-5" src={CarouselRight.src} alt="Carousel left arrow" />
        </button>
      }
    >
      {carouselType === 'account'
        ? accounts.map((account, index) => (
            <AccountBlock
              key={index}
              cardNumber={account.cardNumber}
              expirationDate={account.expirationDate}
              cvc={account.cvc}
              cardOwnerName={account.cardOwnerName}
              accountImg={account.accountImg}
              bankName={account.bankName}
              setCardInfo={setCardInfo}
            />
          ))
        : cards.map((card, index) => (
            <CardBlock
              key={index}
              cardNumber={card.cardNumber}
              expirationDate={card.expirationDate}
              cvc={card.cvc}
              cardOwnerName={card.cardOwnerName}
              cardImg={card.cardImg}
              bankName={card.bankName}
              setCardInfo={setCardInfo}
            />
          ))}
    </Carousel>
  );
}
