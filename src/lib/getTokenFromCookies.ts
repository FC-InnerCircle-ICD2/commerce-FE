import { headers } from 'next/headers';

export async function getAccessToken() {
  const headerList = await headers();
  const cookieHeader = headerList.get('cookie') || '';

  // 쿠키에서 accessToken 추출
  const accessToken = cookieHeader
    .split('; ')
    .find((row) => row.startsWith('Access-Token='))
    ?.split('=')[1] || null;

  return accessToken;
}