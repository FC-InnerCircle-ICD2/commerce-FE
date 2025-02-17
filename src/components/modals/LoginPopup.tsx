import Image from 'next/image';
import { useState } from 'react';
import kakaoSymbol from '../../assets/kakao.png';
import naverSymbol from '../../assets/naver.png';

const LoginPopup = ({ closePopup, onLoginSuccess }: { closePopup: () => void, onLoginSuccess: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  /** 
   * TODO: mockBackendRequest를 실제 백엔드 API 호출로 대체해야 합니다.
   * 이 함수는 선택된 제공자(카카오/네이버)의 OAuth URL을 가져와야 합니다.
   */
  const mockBackendRequest = async (provider: 'kakao' | 'naver') => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUrls = {
      kakao: 'https://mockkakaologin.com/authorize',
      naver: 'https://mocknaverlogin.com/authorize'
    };
    setIsLoading(false);
    return mockUrls[provider];
  };

  /** 
   * TODO: 실제 OAuth 흐름을 구현할 때 mockAuthProcess를 제거해야 합니다.
   */
  const mockAuthProcess = async (provider: 'kakao' | 'naver') => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return `mock_auth_code_${provider}`;
  };

  /** 
   * TODO: mockTokenExchange를 실제 백엔드 API 호출로 대체해야 합니다.
   * 이 함수는 인증 코드를 액세스 토큰과 리프레시 토큰으로 교환해야 합니다.
   */
  const mockTokenExchange = async (authCode: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      accessToken: `mock_access_token_${authCode}`,
      refreshToken: `mock_refresh_token_${authCode}`
    };
  };

  const handleLogin = async (provider: 'kakao' | 'naver') => {
    try {
      const loginUrl = await mockBackendRequest(provider);
      console.log(`백엔드에서 받은 로그인 URL: ${loginUrl}`);
      
      /** 
       * TODO: 제공자의 OAuth 페이지로 실제 리다이렉트를 구현해야 합니다.
       * 모의 인증 프로세스를 실제 OAuth 흐름으로 대체해야 합니다.
       */
      console.log(`${provider} 로그인 페이지로 리다이렉트 (모의)`);
      const authCode = await mockAuthProcess(provider);
      
      console.log(`인증 코드 발급 완료: ${authCode}`);
      const { accessToken, refreshToken } = await mockTokenExchange(authCode);
      
      /** 
       * TODO: Next.js 에서 토큰을 저장하는 방법을 확인 해야합니다. (추후 검토)
       */
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      
      console.log('로그인 성공:', { accessToken, refreshToken });
      onLoginSuccess();
      closePopup();
    } catch (error) {
      console.error('로그인 실패:', error);
      /** TODO: 적절한 에러 처리와 사용자 피드백을 구현해야 합니다. */
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
