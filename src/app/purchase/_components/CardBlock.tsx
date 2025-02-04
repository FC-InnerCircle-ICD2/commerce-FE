interface Account {
  cardName: string;
  cardNumber: string;
  cardImg: string;
}

export default function CardBlock(props: Account) {
  const { cardName, cardNumber, cardImg } = props;
  return (
    <div className="h-auto flex flex-col items-center">
      {cardImg && <img src={cardImg} alt="Bank account" className="w-full h-[120px] rounded-[5px]" />}
      <div className="flex justify-between mt-1 w-full items-center p-2 h-[30px]">
        <span className="font-semibold text-xs">{cardName}</span>
        <span className="font-light text-xs text-neutral-600">{cardNumber}</span>
      </div>
    </div>
  );
}
