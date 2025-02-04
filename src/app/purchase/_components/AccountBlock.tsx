interface Account {
  bank: string;
  accountNumber: string;
  accountImg?: string;
}

export default function AccountBlock(props: Account) {
  const { bank, accountNumber, accountImg } = props;
  return (
    <div className="h-[80px] bg-white rounded-[10px] box-border flex items-center border border-neutral-300 px-4">
      <div className="w-10 h-10 rounded-full">
        {accountImg && <img src={accountImg} alt="Bank account" className="w-10 h-10 rounded-full" />}
      </div>
      <div className="flex flex-col ml-3">
        <span className="font-medium text-sm">{bank}</span>
        <span className="font-light text-xs text-neutral-600">{accountNumber}</span>
      </div>
    </div>
  );
}
