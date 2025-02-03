'use client';

import { useState } from 'react';
import { IProduct, IProductOptionDetail } from '@/api/product';
import ProductDegtailCards from './ProductDetailCards';
import ProductDetailSelectOptions from './ProductDetailSelectOptions';

const ProductDetailClient: React.FC<{ product: IProduct }> = ({ product }) => {
  const [selectedTab, setSelectedTab] = useState('상세정보');
  const [selectOptionDetails, setSelectOptionDetails] = useState<IProductOptionDetail[]>([]);

  // 대표 이미지 URL 찾기
  const representativeImageUrl = product.options.flatMap((option) => option.optionDetails).find((detail) => detail.url);

  function handleAddOptionsDetail(option: IProductOptionDetail) {
    const find = selectOptionDetails.find((item) => item.value === option.value);
    if (find) {
      // TODO: 갯수 추가하는 코드 필요
    } else {
      setSelectOptionDetails([...selectOptionDetails, option]);
    }
  }

  function handleRemoveOption(option: IProductOptionDetail) {
    setSelectOptionDetails([...selectOptionDetails.filter((item) => item.value !== option.value)]);
  }

  return (
    <div className="container mx-auto flex px-4 py-8 flex-col gap-">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8">
        {/* 상품 이미지 */}
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <img
            src={representativeImageUrl?.url ?? '/placeholder-image.jpg'}
            alt={product.name}
            className="w-full h-96 lg:h-[500px] object-cover"
          />
        </div>

        <div className="w-full flex flex-col items-center lg:w-1/2 ">
          {/* 상품 정보 */}
          <div className="w-full flex-grow bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg py-[40px] px-[30px]">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="text-gray-600 text-sm flex items-center gap-2 mt-2">
              <span className="text-yellow-500">★ {product.rating}</span>
              <span>|</span>
              <span>490개의 리뷰</span>
              <span>{`>`}</span>
            </div>
            <p className="text-2xl font-bold mt-4">{product.price.toLocaleString()}원</p>

            <div className="border-t my-[30px] border-[#646464]" />

            {/* 옵션 선택 */}
            {product.options.map((option) => (
              <div key={option.id} className="mb-4">
                <h3 className="text-md font-semibold">{option.name}</h3>
                <div className="flex space-x-2 mt-2">
                  {option.optionDetails.map((detail) => (
                    <button
                      key={detail.value}
                      className="px-4 py-2 border rounded-lg border-gray-400 text-sm hover:bg-slate-300"
                      onClick={() => handleAddOptionsDetail(detail)}
                    >
                      {detail.value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="border-t my-[30px] border-[#646464]" />
            {/* 선택된 옵션 */}
            <div className="flex flex-col gap-4">
              {selectOptionDetails.map((options, i) => {
                return (
                  <ProductDetailSelectOptions
                    key={i}
                    product={product}
                    seletedOptionDetail={options}
                    handleRemoveOption={handleRemoveOption}
                  />
                );
              })}
            </div>

            <div className="border-t my-[30px] border-[#646464]" />

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
          <button className="mt-6 px-6 py-3 bg-[#CBD5E1] text-[#082F49] font-bold rounded-lg w-full">구매하기</button>
        </div>
      </div>

      <div className="border-t border-[#D9D9D9] mt-[40px] mb-[50px]" />

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

      <div className="border-t border-[#D9D9D9] mt-8 mb-8" />
      <ProductDegtailCards />
    </div>
  );
};

export default ProductDetailClient;
