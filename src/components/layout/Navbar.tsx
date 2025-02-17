'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import LoginPopup from '../modals/LoginPopup';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
      // 실제 구현에서는 토큰을 검증하고 사용자 정보를 가져와야 합니다.
      setUsername('홍길동'); // 예시 이름
    } else {
      setIsLoggedIn(false); // Ensure logged out state when no token
      setUsername('');
    }
  }, []);

  const handleLogin = () => {
    setIsPopupOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setUsername('');
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const onLoginSuccess = () => {
    setIsLoggedIn(true);
    setUsername('홍길동'); // 예시 이름, 실제로는 로그인 응답에서 받아와야 합니다.
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
        <LoginPopup closePopup={closePopup} onLoginSuccess={onLoginSuccess} />
      )}
    </>
  );
};

export default Navbar;
