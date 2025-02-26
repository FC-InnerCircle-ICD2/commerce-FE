export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const accessToken = localStorage.getItem('accessToken');
  const headers = new Headers(options.headers || {});

  if (accessToken) {
    console.log(accessToken);
    headers.set('Authorization', `${accessToken}`);
  }

  return fetch(url, {
    ...options,
    headers,
  });
}
