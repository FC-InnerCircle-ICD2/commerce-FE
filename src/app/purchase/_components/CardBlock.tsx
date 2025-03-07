import type { CardInfo } from '@/api/order';
import { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface Card {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  cardOwnerName: string;
  cardImg: string;
  bankName?: string;
  selectedCard: CardInfo | null;
  setCardInfo: React.Dispatch<React.SetStateAction<CardInfo>>;
  setSelectedCard: React.Dispatch<React.SetStateAction<CardInfo | null>>;
}

export default function CardBlock(props: Card) {
  const {
    selectedCard,
    cardNumber,
    cardOwnerName,
    expirationDate,
    cvc,
    cardImg,
    bankName,
    setCardInfo,
    setSelectedCard,
  } = props;
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selectedCard?.cardNumber === cardNumber);
  }, [selectedCard]);

  const handleCardBtn = () => {
    setCardInfo({
      ...{
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvc: cvc,
        cardOwnerName: cardOwnerName,
      },
    });
    setSelectedCard({
      ...{
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvc: cvc,
        cardOwnerName: cardOwnerName,
      },
    });
  };

  return (
    <button onClick={handleCardBtn}>
      <div className="h-auto flex flex-col items-center">
        {cardImg && (
          <div className="relative w-full h-[120px] rounded-[5px] overflow-hidden">
            <img src={cardImg} alt="Bank account" className="w-full h-full rounded-[5px] object-cover" />

            {/* 선택 된 카드 표시 */}
            {isSelected && (
              <div className="absolute inset-0 bg-white/50 border border-sky-800 border-2 flex items-center justify-center">
                <CheckCircleIcon className="text-sky-800 h-8 w-8" />
              </div>
            )}
          </div>
        )}
        <div className="flex justify-between mt-1 w-full items-center p-2 h-[30px]">
          <span className="font-semibold text-xs">{bankName || cardOwnerName}</span>
          <span className="font-light text-xs text-neutral-600">{cardNumber}</span>
        </div>
      </div>
    </button>
  );
}
