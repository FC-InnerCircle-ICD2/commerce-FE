'use client';

import { Carousel } from 'ji-react-carousel';
import CarouselLeft from '@/assets/purchase/carouselLeft.png';
import CarouselRight from '@/assets/purchase/carouselRight.png';
import AccountBlock from './AccountBlock';
import { Card } from '@/components/common';
import CardBlock from './CardBlock';

interface Account {
  bank: string;
  accountNumber: string;
  accountImg?: string;
}

interface Card {
  cardName: string;
  cardNumber: string;
  cardImg: string;
}

interface Props {
  accounts?: Account[];
  cards?: Card[];
  carouselType: 'account' | 'card';
}

export default function PurchaseCarousel(props: Props) {
  const { accounts = [], cards = [], carouselType } = props;

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
              bank={account.bank}
              accountNumber={account.accountNumber}
              accountImg={account.accountImg}
            />
          ))
        : cards.map((card, index) => (
            <CardBlock key={index} cardName={card.cardName} cardNumber={card.cardNumber} cardImg={card.cardImg} />
          ))}
    </Carousel>
  );
}
