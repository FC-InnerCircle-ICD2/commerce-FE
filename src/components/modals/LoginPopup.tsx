import Image from 'next/image';
import kakaoSymbol from '../../assets/kakao.png';
import naverSymbol from '../../assets/naver.png';

const LoginPopup = ({ closePopup }: any) => {
  return (
    <>
      <div
        onClick={closePopup}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div>
      <div className="fixed inset-x-0 top-[30%] mx-auto w-[300px] bg-white rounded-lg shadow-lg z-50 p-4">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold">소셜 로그인</h3>
          <button onClick={closePopup} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => alert('카카오 로그인')}
            className="w-full bg-[#FEE500] text-[12px] text-black py-2 rounded-lg flex items-center justify-center"
          >
            <Image src={kakaoSymbol} alt="Kakao" width={20} height={20} className="mr-2" />
            카카오 로그인
          </button>
          <button
            onClick={() => alert('네이버 로그인')}
            className="w-full bg-[#03C75A] text-[12px] text-white py-2 rounded-lg flex items-center justify-center"
          >
            <Image src={naverSymbol} alt="Naver" width={18} height={18} className="mr-2" />
            네이버 로그인
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPopup;