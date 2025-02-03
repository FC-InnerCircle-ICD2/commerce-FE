"use client";

import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { Card } from "@/components/common";

export default function Complete() {
  const Carousel = dynamic(() => import('ji-react-carousel').then((mod) => mod.Carousel), {
    ssr: false
  });
  const [deviceType, setDeviceType] = useState('desktop');
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 5; 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 430) {
        setDeviceType('mobile');
      } else if (window.innerWidth <= 895) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cardData = [
    { imgUrl: 'https://housing.seoul.go.kr/design/theme/housing/images/sub/rnw_corner_bg03.png', title: 'test', price: 5, review: 5 },
    { imgUrl: 'https://housing.seoul.go.kr/design/theme/housing/images/sub/rnw_corner_bg03.png', title: 'test', price: 5, review: 5 },
    { imgUrl: 'https://housing.seoul.go.kr/design/theme/housing/images/sub/rnw_corner_bg03.png', title: 'test', price: 5, review: 5 },
    { imgUrl: 'https://housing.seoul.go.kr/design/theme/housing/images/sub/rnw_corner_bg03.png', title: 'test', price: 5, review: 5 },
    { imgUrl: 'https://housing.seoul.go.kr/design/theme/housing/images/sub/rnw_corner_bg03.png', title: 'test', price: 5, review: 5 },
  ];

  const LeftArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className={`absolute left-[40px] top-1/2 transform -translate-y-1/2 bg-gray-400 text-white p-2 shadow-md hover:bg-gray-700 transition 
  rounded-l-none rounded-r-full w-[38px] h-[38px] ${
        currentIndex === 0 ? "hidden" : ""
      }`}
      aria-label="Previous Slide"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </button>
  );
  
  const RightArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className={`absolute right-[40px] top-1/2 transform -translate-y-1/2 bg-gray-400 text-white p-2 shadow-md hover:bg-gray-700 transition 
  rounded-r-none rounded-l-full w-[38px] h-[38px] ${
        currentIndex === totalSlides - 1 ? "hidden" : ""
      }`}
      aria-label="Next Slide"
    >
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
    </button>
  );


  return (
    <div className="min-h-screen flex items-center justify-center bg-white mt-10 mb-32">
      <div className="w-full p-6 md:p-8 bg-slate-50 border border-1 border-slate-300 flex flex-col items-center max-w-[1240px] sm:p-0 rounded-2xl max-sm:rounded-none">
        <div className="w-full max-w-[704px] flex flex-col items-center">
          <h2 className="text-center text-xl md:text-2xl font-semibold mb-6">
            주문완료 <span className="font-normal">되었습니다</span>
          </h2>
          <div className="border-t border-gray-200 max-sm:w-[312px] w-[704px]" />
          <div className="pt-6">
            <div className="flex">
              <h3 className="text-sm md:text-base font-medium mb-2">주문번호</h3>
              <p className="text-gray-700 text-sm md:text-base mb-4 underline">20231234567890</p>
            </div>
            <div className="border-t border-gray-200 mb-6 max-sm:w-[312px] w-[704px]" />
            <p className="text-sm md:text-base font-medium mb-2">김지훈(집)</p>
            <p>010-1234-5678</p>
            <p className="text-gray-700 text-sm md:text-base">
              강원도 속초시 중앙로 123, APT 101동 1004호
            </p>
          </div>
          <div className="border-t border-gray-200 mb-8 mt-4 max-sm:w-[312px] w-[704px]" />
          <button className="w-full bg-slate-300 text-sky-950 w-[200px] max-sm:w-[312px] font-bold text-sm md:text-base py-3 rounded-lg hover:bg-slate-400 transition">
            홈으로
          </button>
        </div>

        <div className="mt-10 max-w-[875px] relative">
          <h3 className="text-left ml-10 max-sm:ml-0 text-sm md:text-base font-medium mb-4">
            이런 상품 어떠신가요?
          </h3>
          {deviceType === 'mobile' ? (
            <div className="grid grid-cols-2 gap-4">
              {cardData.map((card, i) => (
                <Card key={i} {...card} />
              ))}
            </div>
          ) : deviceType === 'tablet' ? (
            <div className="grid grid-cols-3 gap-4">
              {cardData.map((card, i) => (
                <Card key={i} {...card} />
              ))}
            </div>
          ) : (
            <Carousel
              infinite={false}
              viewCount={4}
              width={200}
              LeftArrow={<LeftArrow />}
              RightArrow={<RightArrow />}
              hasDeleteButton={false}
            >
              {cardData.map((card, i) => (
                <div key={i} onClick={() => setCurrentIndex(i)}>
                  <Card {...card} />
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
}
