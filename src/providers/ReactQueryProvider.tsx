'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2, // 실패한 요청을 최대 2번 재시도
            refetchOnWindowFocus: false, // 창에 포커스될 때 자동으로 다시 가져오기 비활성화
            staleTime: 5 * 60 * 1000, // 데이터가 신선하다고 간주되는 시간 (5분)
            refetchOnMount: false, // 컴포넌트가 마운트될 때 다시 가져오기 비활성화
            refetchOnReconnect: true, // 네트워크 재연결 시 다시 가져오기 활성화
          },
          mutations: {
            retry: 2, // 실패한 Mutation을 최대 2번 재시도
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
