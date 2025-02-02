'use client'

import { useState } from "react";
import { Card } from "@/components/common";

interface ProductDetailClientProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    category: {
      id: number;
      name: string;
      parentCategoryId: number | null;
      subCategories: Array<any>;
    };
    provider: {
      id: number;
      name: string;
      description: string;
    };
    options: Array<{
      id: number;
      name: string;
      optionDetails: Array<{
        id: number;
        value: string;
        quantity: number;
        order: number;
        additionalPrice: number;
        images: Array<{
          id: number;
          fileOrder: number;
          url: string;
          representative: boolean;
        }>;
      }>;
    }>;
  };
  cardData: Array<{ imgUrl: string; title: string; price: number; review: number }>;
}

const ProductDetailClient: React.FC<ProductDetailClientProps> = ({ product, cardData }) => {
  const [selectedTab, setSelectedTab] = useState("상세정보");

  // 대표 이미지 URL 찾기
  const representativeImageUrl = product.options
    .flatMap(option => option.optionDetails)
    .flatMap(detail => detail.images)
    .find(image => image.representative)?.url || '/placeholder-image.jpg';

  return (
    <div className="container mx-auto flex px-4 py-8 flex-col gap-">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        {/* 상품 이미지 */}
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <img 
            src={representativeImageUrl} 
            alt={product.name} 
            className="w-full h-96 lg:h-[500px] object-cover" 
          />
        </div>
        
        <div className="w-full flex flex-col items-center lg:w-1/2 ">
          {/* 상품 정보 */}
          <div className="w-full flex-grow bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg py-[40px] px-[30px]">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="text-gray-600 text-sm flex items-center gap-2 mt-2">
              <span className="text-yellow-500">★ 4.9</span>
              <span>|</span>
              <span>490개의 리뷰</span>
              <span>{`>`}</span>
            </div>
            <p className="text-2xl font-bold mt-4">{product.price.toLocaleString()}원</p>

            <div className="border-t my-[30px] border-[#646464]"/>

            {/* 옵션 선택 */}
            {product.options.map((option) => (
              <div key={option.id} className="mb-4">
                <h3 className="text-md font-semibold">{option.name}</h3>
                <div className="flex space-x-2 mt-2">
                  {option.optionDetails.map((detail) => (
                    <button key={detail.id} className="px-4 py-2 border rounded-lg border-gray-400 text-sm">
                      {detail.value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="border-t my-[30px] border-[#646464]"/>

            {/* 선택된 옵션 */}
            <div className="border rounded-lg p-4 bg-[#FFFFFF]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-md font-semibold">{product.options[0]?.optionDetails[0]?.value}</span>
                <button className="text-gray-500">✕</button>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center rounded-lg overflow-hidden">
                  <button className="px-4 py-2 border rounded-2xl text-[#CCCCCC]">-</button>
                  <span className="px-6 py-2 text-lg">1</span>
                  <button className="px-4 py-2 border rounded-2xl text-[#CCCCCC]">+</button>
                </div>
                <span className="text-lg font-semibold">{product.price.toLocaleString()} 원</span>
              </div>
            </div>

            <div className="border-t my-[30px] border-[#646464]"/>
            
            {/* 총 가격 */}
            <div className="flex justify-between">
              <span>총 상품 금액</span>
              <div className="flex gap-[15px] items-center">
                <span>총 수량 1개</span>
                <span>|</span>
                <span className="text-xl font-bold">{product.price.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* 구매 버튼 */}
          <button className="mt-6 px-6 py-3 bg-[#CBD5E1] text-[#082F49] font-bold rounded-lg w-full">
            구매하기
          </button>
        </div>
      </div>

      <div className="border-t border-[#D9D9D9] mt-[40px] mb-[50px]"/>

      {/* 상세정보, 리뷰, QnA */}
      <div className="flex justify-center text-lg font-semibold w-full border border-[#D9D9D9] rounded-lg overflow-hidden">
        {['상세정보', '리뷰', 'QnA'].map((tab) => (
          <button
            key={tab}
            className={`
              w-full px-6 py-2 ${selectedTab === tab ? 'bg-[#F1F5F9] text-black border-none' : 'text-gray-600 hover:text-black border-[#D9D9D9]'}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="border-t border-[#D9D9D9] mt-8 mb-8"/>

      <div className="w-full relative">
        <h3 className="text-left ml-10 max-sm:ml-0 text-sm md:text-base font-medium mb-4">
          이런 상품 어때요?
        </h3>
          <div className="flex">
            {cardData.map((card, i) => (
              <Card key={i} {...card} />
            ))}
          </div>
        </div>
    </div>
  );
};

export default ProductDetailClient;
