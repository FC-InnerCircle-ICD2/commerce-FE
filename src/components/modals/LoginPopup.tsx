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


    const handleLogin = async (provider: 'kakao' | 'naver') => {
        try {
            setIsLoading(true);
            const loginUrl = await getLoginUrl(provider);
            window.location.href = `http://3.37.67.153:8082${loginUrl}`;
            
            // TODO: 로그인 작업 후 사용
            onLoginSuccess();
            
        } catch (error) {
            console.error('로그인 실패:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
            <div onClick={closePopup} className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            <div className="fixed inset-x-0 top-[30%] mx-auto w-[300px] bg-white rounded-lg shadow-lg z-50 p-4">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h3 className="text-lg font-semibold">소셜 로그인</h3>
                    <button onClick={closePopup} className="text-gray-500 hover:text-black">✕</button>
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
