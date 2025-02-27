// 예: src/lib/globalFetchOverride.js

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoi64W47KCV66-8Iiwicm9sZXMiOlsiUk9MRV9ST0xFX0FETUlOX01FTUJFUiIsIlJPTEVfUk9MRV9DT01NRVJDRV9NRU1CRVIiXSwiaWF0IjoxNzQwNDAxMDM2LCJleHAiOjE3NDE2MTA2MzZ9.iL0hpmNNE5Y6QfbEyv9r3ku-hOefGjHdYL93f6jNpJk';

// 개발 환경에서만 활성화하도록 조건부 처리 (필요시)
if (process.env.NODE_ENV === 'development') {
  const DEFAULT_TOKEN = `Bearer ${token}`;

  // 서버 환경 (Node.js)
  if (typeof window === 'undefined') {
    const originalFetch = global.fetch;
    global.fetch = async (input, init = {}) => {
      const headers = new Headers(init.headers || {});
      if (!headers.has('Authorization')) {
        headers.set('Authorization', DEFAULT_TOKEN);
      }
      const newInit = { ...init, headers };
      return originalFetch(input, newInit);
    };
  } else {
    const originalFetch = window.fetch;
    window.fetch = async (input, init = {}) => {
      const headers = new Headers(init.headers || {});
      if (!headers.has('Authorization')) {
        headers.set('Authorization', DEFAULT_TOKEN);
      }
      const newInit = { ...init, headers };
      return originalFetch(input, newInit);
    };
  }
}
