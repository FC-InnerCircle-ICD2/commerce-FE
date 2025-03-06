'use client';

import PostcodePopup from '@/components/common/PostCode';
import { useState } from 'react';

const ParentComponent = () => {
  const [address, setAddress] = useState('');

  const handleAddressSelect = (data: any) => {
    setAddress(`${data.roadAddress} (${data.zonecode})`);
  };

  return (
    <div>
      <PostcodePopup onComplete={handleAddressSelect} />
      <p>선택한 주소: {address}</p>
    </div>
  );
};

export default ParentComponent;
