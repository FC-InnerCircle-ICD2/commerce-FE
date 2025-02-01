'use client';

import { useEffect } from 'react';

// 서버와 동시에 등록시 인식 못하고 undefined 반환. component로 변경.
export function MswComponent() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      async function enableApiMocking() {
        if (typeof window !== 'undefined') {
          const { worker } = await import('@/mock/browser');
          await worker.start({
            onUnhandledRequest: 'bypass',
          });
        }
      }
      enableApiMocking();
    }
  }, []);

  return null;
}
