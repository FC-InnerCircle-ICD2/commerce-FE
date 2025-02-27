import { create } from 'zustand';

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
    set({ isLoggedIn: false, accessToken: null });
  },
}));
