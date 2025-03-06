'use client';

import { useCallback } from 'react';
import { Address } from 'react-daum-postcode';

const PostcodePopup = ({ onComplete }: { onComplete: (data: Address) => void }) => {
  const openPopup = useCallback(() => {
    const width = 500;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const popup = window.open(
      '/postcode', // Next.js의 별도 페이지를 사용
      'postcodePopup',
      `width=${width},height=${height},top=${top},left=${left},resizable=no`,
    );

    if (popup) {
      window.addEventListener('message', (event) => {
        if (event.origin !== window.location.origin) return;
        if (event.data?.postcodeData) {
          onComplete(event.data.postcodeData);
        }
      });
    }
  }, [onComplete]);

  return (
    <button className="border border-neutral-300 px-3.5 py-2.5 bg-white rounded-lg text-sm" onClick={openPopup}>
      우편번호 찾기
    </button>
  );
};

export default PostcodePopup;
