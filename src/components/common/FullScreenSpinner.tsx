import React from 'react';

export default function FullScreenSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-md z-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">로딩 중...</p>
      </div>
    </div>
  );
}
