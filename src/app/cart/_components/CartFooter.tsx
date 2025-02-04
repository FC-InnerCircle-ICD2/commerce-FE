import { IProduct } from '@/api/product';

type Props = {
  checkList: IProduct[];
};

export default function CartFooter({ checkList }: Props) {
  return (
    <footer className="w-full py-[10px] bottom-0 fixed bg-slate-700 flex justify-end px-3 tablet:px-[100px] ">
      <div className="text-white min-w-[100px] px-[10px] py-2 bg-blue-200">
        {checkList.reduce((a, b) => a + b.price, 0)}원 구매하기
      </div>
    </footer>
  );
}
