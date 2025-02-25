'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import LoginPopup from '../modals/LoginPopup';
import { useAuthStore } from '@/store/authStore';

const Navbar = () => {
  const { isLoggedIn, accessToken, logout } = useAuthStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (accessToken) {
      // 액세스 토큰이 존재하면 사용자 정보를 가져오는 로직을 여기에 추가
      setUsername('홍길동'); // 예시 이름
    } else {
      setUsername('');
    }
  }, [accessToken]);

  const handleLogin = () => {
    setIsPopupOpen(true);
  };

  const handleLogout = () => {
    logout(); // 주스탄드에서 logout 함수 호출
    setUsername('');
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
                    <span>{username} 님</span>
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

export default Navbar;
