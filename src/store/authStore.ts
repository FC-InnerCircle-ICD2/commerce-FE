import { create } from 'zustand';

const BASE_URL = process.env.NEXT_PUBLIC_REDIRECT_URL;
/**
 * @description
 * 로컬 환경이면 'localhost', 프로덕션 환경이면 '.emmotional-cart.click'
 * 
 * 하지만 개발, 상용 환경 모두 쿠키의 도메인이 .emmotional-cart.click 로 설정돼 저장됩니다.
 * 따라서 현재는 로컬에서 쿠키 제거가 불가능합니다.
 */
const DOMAIN = BASE_URL?.includes('localhost') ? 'localhost' : '.emmotional-cart.click';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  getAccessToken: () => string | null;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  accessToken: null,

  getAccessToken: () => {
    return localStorage.getItem('accessToken');
  },

  setAccessToken: (token) => {
    if (token) {
      localStorage.setItem('accessToken', `Bearer ${token}`);
      set({ isLoggedIn: true, accessToken: token });
    } else {
      localStorage.removeItem('accessToken');
      set({ isLoggedIn: false, accessToken: null });
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');

    // 쿠키에서 Access-Token과 Refresh-Token 제거
    document.cookie = `Access-Token=; path=/; domain=${DOMAIN}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    document.cookie = `Refresh-Token=; path=/; domain=${DOMAIN}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

    set({ isLoggedIn: false, accessToken: null });
  },
}));
