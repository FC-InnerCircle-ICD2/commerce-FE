'use client';

import { useEffect } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';

const PostcodePage = () => {
  const handleComplete = (data: Address) => {
    if (window.opener) {
      window.opener.postMessage({ postcodeData: data }, window.location.origin);
      window.close(); // 팝업 창 닫기
    }
  };

  useEffect(() => {
    if (!window.opener) {
      window.location.href = '/';
    }
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <DaumPostcode onComplete={handleComplete} autoClose />
    </div>
  );
};

export default PostcodePage;
