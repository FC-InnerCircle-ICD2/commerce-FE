type Props = {
  handleAllCheckList: () => void;
  handleDeleteCheckList: () => void;
};

export default function CartCheckComponent({ handleAllCheckList, handleDeleteCheckList }: Props) {
  return (
    <div className="w-full py-4 px-3 flex items-center justify-between tablet:py-[20px] tablet:px-[100]">
      <div onClick={handleAllCheckList}>전체 선택</div>
      <button onClick={handleDeleteCheckList}>선택 삭제</button>
    </div>
  );
}
