'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleLogin = () => {
    setIsPopupOpen(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <nav className="hidden mobile:block top-0 shadow-sm">
        <div className="max-w-custom mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center space-x-4">
              <span className="flex items-center gap-2">
                <Image src="/assets/paw.svg" alt="서브 로고 이미지" width={10} height={10} />
                <span className="text-xs text-[#A8C4D9]">감성개발자들</span>
              </span>
              <span className="flex items-center gap-2">
                <Image src="/assets/cent.svg" alt="서브 로고 이미지2" width={10} height={10} />
                <span className="text-xs text-neutral-400">Inner Circle</span>
              </span>
            </div>
            <div className="text-xs flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <span className="flex items-center gap-2">
                    <UserCircleIcon className="w-3 h-3 text-[#5F6368]" />
                    <span>홍길동 님</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="border rounded-xl border-zinc-300 text-xs text-black px-2 py-1"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogin}
                  className="border rounded-xl border-zinc-300 text-xs text-black px-2 py-1"
                >
                  로그인
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {isPopupOpen && (
        <LoginPopup closePopup={closePopup} />
      )}
    </>
  );
};

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
            className="w-full bg-[#FEE500] text-black py-2 rounded-lg flex items-center justify-center"
          >
            <Image src={kakaoSymbol} alt="Kakao" width={20} height={20} className="mr-2" />
            카카오 로그인
          </button>
          <button
            onClick={() => alert('네이버 로그인')}
            className="w-full bg-[#03C75A] text-white py-2 rounded-lg flex items-center justify-center"
          >
            <Image src={naverSymbol} alt="Naver" width={20} height={20} className="mr-2" />
            네이버 로그인
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;