'use client'

import { useEffect } from 'react';

interface TokenHandlerProps {
  accessToken: string | null;
}

export function TokenHandler({ accessToken }: TokenHandlerProps) {
  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production';
    
    if (isProduction) {
      if (accessToken) {
        console.log('디버깅용: 프로덕션', accessToken)
        localStorage.setItem('accessToken', `Bearer ${accessToken}`);
      }
    } else {
      const localToken = process.env.NEXT_PUBLIC_TEMP_TOKEN;
      if (localToken) {
        console.log('디버깅용: 로컬')
        localStorage.setItem('accessToken', `Bearer ${localToken}`);
      }
    }
  }, [accessToken]);

  return null;
}