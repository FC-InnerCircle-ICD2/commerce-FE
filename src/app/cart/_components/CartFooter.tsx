import { IProduct } from '@/api/product';

type Props = {
  checkList: IProduct[];
};

export default function CartFooter({ checkList }: Props) {
  return (
    <footer className="w-full p-[10px] sticky bg-black flex justify-end">
      <div className="text-white w-[100px] py-2 bg-blue-200">
        {checkList.reduce((a, b) => a + b.price, 0)}원 구매하기
      </div>
    </footer>
  );
}
