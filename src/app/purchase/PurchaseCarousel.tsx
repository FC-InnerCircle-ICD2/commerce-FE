'use client';

import { Carousel } from 'ji-react-carousel';
import CarouselLeft from '@/assets/purchase/carouselLeft.png';
import CarouselRight from '@/assets/purchase/carouselRight.png';

interface Account {
  bank: string;
  accountNumber: string;
}

interface Props {
  accounts: Account[];
}

export default function PurchaseCarousel(props: Props) {
  const { accounts } = props;

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
      {accounts.map((account, index) => (
        <div
          key={index}
          className="w-[200px] h-[80px] bg-white rounded-[10px] flex items-center border border-neutral-300 px-4"
        >
          <div className="w-10 h-10 rounded-full bg-neutral-300"></div>
          <div className="flex flex-col ml-3">
            <span className="font-medium text-sm">{account.bank}</span>
            <span className="font-light text-xs text-neutral-600">{account.accountNumber}</span>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
