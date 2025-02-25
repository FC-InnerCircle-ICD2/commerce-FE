import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="w-screen h-screen overflow-hidden bg-slate-200 flex flex-col items-center justify-center px-[20px]">
      <h1 className="text-[30px] font-bold mb-[20px]">빈페이지에 접근하셨습니다.</h1>
      <p className="text-center whitespace-pre-wrap mb-[40px]">
        페이지 주소를 잘못 입력하셨거나,
        <br />
        주소가 변경 또는 삭제되었을 수 있습니다.
        <br />
        주소를 다시 확인해주세요
      </p>
      <Link href="/" className="w-[100px] py-[10px] bg-blue-300 text-center text-white font-bold rounded-md">
        홈으로
      </Link>
    </section>
  );
}
