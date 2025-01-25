// server mocking init file

import { server } from './server';

export function init() {
  server.listen({
    onUnhandledRequest: 'bypass', // 모킹되지 않은 요청은 그대로 진행
  });
}
