import type { CardInfo } from '@/api/order';

interface Account {
  cardNumber: string;
  expirationDate: string;
  cvc: string;
  cardOwnerName: string;
  accountImg?: string;
  bankName?: string;
  setCardInfo: React.Dispatch<React.SetStateAction<CardInfo>>;
}

export default function AccountBlock(props: Account) {
  const { cardNumber, cardOwnerName, expirationDate, cvc, accountImg, bankName, setCardInfo } = props;

  const handleCardBtn = () => {
    setCardInfo({
      cardNumber,
      cardOwnerName,
      expirationDate,
      cvc,
    });
  };

  return (
    <button
      onClick={handleCardBtn}
      className="w-full hover:bg-neutral-100 h-[80px] bg-white rounded-[10px] box-border border border-neutral-300 px-4"
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full">
          {accountImg && <img src={accountImg} alt="Bank account" className="w-10 h-10 rounded-full" />}
        </div>
        <div className="flex flex-col ml-3 items-start">
          <span className="font-medium text-sm">{bankName || cardOwnerName}</span>
          <span className="font-light text-xs text-neutral-600">{cardNumber}</span>
        </div>
      </div>
    </button>
  );
}
