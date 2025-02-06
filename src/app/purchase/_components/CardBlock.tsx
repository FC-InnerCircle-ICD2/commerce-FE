import type { CardInfo } from '@/api/order';

interface Card {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  cardOwnerName: string;
  cardImg: string;
  bankName?: string;
  setCardInfo: React.Dispatch<React.SetStateAction<CardInfo>>;
}

export default function CardBlock(props: Card) {
  const { cardNumber, cardOwnerName, expirationDate, cvc, cardImg, bankName, setCardInfo } = props;

  const handleCardBtn = () => {
    setCardInfo({
      cardNumber,
      cardOwnerName,
      expirationDate,
      cvc,
    });
  };

  return (
    <button onClick={handleCardBtn}>
      <div className="h-auto flex flex-col items-center">
        {cardImg && <img src={cardImg} alt="Bank account" className="w-full h-[120px] rounded-[5px]" />}
        <div className="flex justify-between mt-1 w-full items-center p-2 h-[30px]">
          <span className="font-semibold text-xs">{bankName || cardOwnerName}</span>
          <span className="font-light text-xs text-neutral-600">{cardNumber}</span>
        </div>
      </div>
    </button>
  );
}
