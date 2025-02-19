import { NextRequest, NextResponse } from 'next/server';

/**
 * 백엔드 API의 기본 URL입니다.
 * TODO: 실제 백엔드 API URL로 변경해야 합니다.
 */
// const API_BASE_URL = 'https://고민중입니다.com';

/**
 * Mock API 응답을 생성하는 함수입니다.
 * TODO: 실제 API 구현 시 이 함수와 호출 부분을 제거하세요.
 */
async function getMockResponse(provider: string, type: 'authorize' | 'token') {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (type === 'authorize') {
    return {
      url: `https://mock-oauth-provider.com/authorize?client_id=mock_id&redirect_uri=http://localhost:3000/callback&response_type=code`,
    };
  } else {
    return {
      accessToken: `mock_access_token_${provider}_${Date.now()}`,
      refreshToken: `mock_refresh_token_${provider}_${Date.now()}`,
    };
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const provider = (await params).provider;

  // TODO: 아래 주석을 제거하고 mock 응답 부분을 지우세요.
  // const response = await fetch(`${API_BASE_URL}/oauth/${provider}/authorize`);
  // const data = await response.json();

  // Mock 응답
  const data = await getMockResponse(provider, 'authorize');

  return NextResponse.json(data);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
  const provider = (await params).provider;
  // const { code } = await request.json();

  // TODO: 아래 주석을 제거하고 mock 응답 부분을 지우세요.
  // const response = await fetch(`${API_BASE_URL}/oauth/${provider}/token`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ code })
  // });
  // const tokens = await response.json();

  // Mock 응답
  const tokens = await getMockResponse(provider, 'token');

  return NextResponse.json(tokens);
}
