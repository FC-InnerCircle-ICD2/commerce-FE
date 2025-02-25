'use client';

import Image from 'next/image';
import { useState } from 'react';
import kakaoSymbol from '../../assets/kakao.png';
import naverSymbol from '../../assets/naver.png';

const NAVER_LOGIN_URL =
  'https://auth-api.emmotional-cart.click/oauth2/authorization/naver?redirect_uri=http://localhost:3000';

const KAKAO_LOGIN_URL =
  'https://auth-api.emmotional-cart.click/oauth2/authorization/kakao?redirect_uri=http://localhost:3000';

const LoginPopup: React.FC<{ closePopup: () => void }> = ({ closePopup }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (url: string) => {
    try {
      setIsLoading(true);
      window.location.href = url; // OAuth 로그인 페이지로 리다이렉트
      closePopup();
    } catch (error) {
      console.error('로그인 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div onClick={closePopup} className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="fixed inset-x-0 top-[30%] mx-auto w-[300px] bg-white rounded-lg shadow-lg z-50 p-4">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold">소셜 로그인</h3>
          <button onClick={closePopup} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => handleLogin(KAKAO_LOGIN_URL)}
            disabled={isLoading}
            className="w-full bg-[#FEE500] text-[12px] text-black py-2 rounded-lg flex items-center justify-center"
          >
            <Image src={kakaoSymbol} alt="Kakao" width={20} height={20} className="mr-2" />
            {isLoading ? '로그인 중...' : '카카오 로그인'}
          </button>
          <button
            onClick={() => handleLogin(NAVER_LOGIN_URL)}
            disabled={isLoading}
            className="w-full bg-[#03C75A] text-[12px] text-white py-2 rounded-lg flex items-center justify-center"
          >
            <Image src={naverSymbol} alt="Naver" width={18} height={18} className="mr-2" />
            {isLoading ? '로그인 중...' : '네이버 로그인'}
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPopup;
