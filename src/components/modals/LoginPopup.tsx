import Image from 'next/image';
import { useState } from 'react';
import kakaoSymbol from '../../assets/kakao.png';
import naverSymbol from '../../assets/naver.png';

const LoginPopup: React.FC<{ closePopup: () => void, onLoginSuccess: () => void }> = ({ closePopup, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const getLoginUrl = async (provider: 'kakao' | 'naver') => {
    const response = await fetch(`/api/auth/${provider}`);
    const data = await response.json();
    return data.url;
  };

  const exchangeCodeForTokens = async (code: string, provider: 'kakao' | 'naver') => {
    const response = await fetch(`/api/auth/${provider}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    return response.json();
  };

  const handleLogin = async (provider: 'kakao' | 'naver') => {
    try {
      setIsLoading(true);
      const loginUrl = await getLoginUrl(provider);
      console.log(`백엔드에서 받은 로그인 URL: ${loginUrl}`);
      
      // TODO: 실제 OAuth 리다이렉트 구현
      // 실제 구현 시 이 부분에서 loginUrl로 리다이렉트해야 합니다.
      console.log(`${provider} 로그인 페이지로 리다이렉트 (모의)`);
      
      // TODO: 실제 인증 코드 수신 구현
      // 실제 구현 시 이 부분은 OAuth 콜백에서 처리되어야 합니다.
      const mockCode = `mock_auth_code_${provider}_${Date.now()}`;
      
      console.log(`인증 코드 발급 완료: ${mockCode}`);
      const { accessToken, refreshToken } = await exchangeCodeForTokens(mockCode, provider);
      
      // TODO: 토큰 저장 방식 검토
      // 보안을 위해 HttpOnly 쿠키 사용을 고려해야 합니다.
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      console.log('로그인 성공:', { accessToken, refreshToken });
      onLoginSuccess();
      closePopup();
    } catch (error) {
      console.error('로그인 실패:', error);
      // TODO: 사용자에게 오류 메시지 표시
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={closePopup}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div>
      <div className="fixed inset-x-0 top-[30%] mx-auto w-[300px] bg-white rounded-lg shadow-lg z-50 p-4">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-lg font-semibold">소셜 로그인</h3>
          <button onClick={closePopup} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => handleLogin('kakao')}
            disabled={isLoading}
            className="w-full bg-[#FEE500] text-[12px] text-black py-2 rounded-lg flex items-center justify-center"
          >
            <Image src={kakaoSymbol} alt="Kakao" width={20} height={20} className="mr-2" />
            {isLoading ? '로그인 중...' : '카카오 로그인'}
          </button>
          <button
            onClick={() => handleLogin('naver')}
            disabled={isLoading}
            className="w-full bg-[#03C75A] text-[12px] text-white py-2 rounded-lg flex items-center justify-center"
          >
            <Image src={naverSymbol} alt="Naver" width={18} height={18} className="mr-2" />
            {isLoading ? '로그인 중...' : '네이버 로그인'}
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPopup;
