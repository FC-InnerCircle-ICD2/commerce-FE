'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

interface TokenHandlerProps {
  accessToken: string | null;
}

export function TokenHandler({ accessToken }: TokenHandlerProps) {
  const { setAccessToken } = useAuthStore();

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction) {
      if (accessToken) {
        // console.log('디버깅용: 프로덕션', accessToken);
        setAccessToken(accessToken);
      }
    } else {
      const localToken = process.env.NEXT_PUBLIC_TEMP_TOKEN;
      if (localToken) {
        // console.log('디버깅용: 로컬');
        setAccessToken(localToken);
      }
    }
  }, [accessToken, setAccessToken]);

  return null;
}
