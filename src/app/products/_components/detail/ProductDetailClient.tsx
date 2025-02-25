'use client';

import { useState } from 'react';
import type { IProductDetail } from '@/api/product';
import ProductDegtailCards from './ProductDetailCards';
import ProductDetailSelectOptions from './ProductDetailSelectOptions';
import { useRouter } from 'next/navigation';
import ProdudctDetailClientOptions, { SelectItem } from './ProductDetailClientOptions';
import ProductDetailClientReview from './ProductDetailClientReivew';
import ProductDetailClientDescription from './ProductDetailClientDescription';

export interface ISelectOptionDetail {
  count: number;
  options: SelectItem[];
}

const ProductDetailClient: React.FC<{ product: IProductDetail }> = ({ product }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>('상세정보');
  const [selectOptions, setSelectOptions] = useState<ISelectOptionDetail[]>([]);

  function handleAddOption(newOptions: SelectItem[]) {
    setSelectOptions((prevOptions) => {
      // 동일한 options을 가진 항목 찾기
      const existingDetail = prevOptions.find(
        (detail) => JSON.stringify(detail.options) === JSON.stringify(newOptions),
      );

      if (existingDetail) {
        // 같은 options이 있으면 count 증가
        return prevOptions.map((detail) =>
          detail === existingDetail ? { ...detail, count: detail.count + 1 } : detail,
        );
      } else {
        // 새로운 options이면 새로운 ISelectOptionDetail 추가
        return [...prevOptions, { count: 1, options: newOptions }];
      }
    });
  }

  function handleRemoveOption(option: ISelectOptionDetail) {
    setSelectOptions([...selectOptions.filter((item) => JSON.stringify(item) !== JSON.stringify(option))]);
  }

  function handleOptionCount(option: ISelectOptionDetail, flag: boolean) {
    setSelectOptions([
      ...selectOptions.map((item) => {
        if (JSON.stringify(item) === JSON.stringify(option))
          return { ...item, count: flag ? item.count + 1 : item.count - 1 < 1 ? 1 : item.count - 1 };
        return item;
      }),
    ]);
  }

  const handlePurchase = () => {
    if (selectOptions.length > 0) {
      const paramData = {
        product,
        selectedOptions: selectOptions,
      };
      const encodedData = encodeURIComponent(JSON.stringify(paramData));
      router.push(`/purchase?data=${encodedData}`);
    }
  };

  function calculateTotalAdditionalPrice(): number {
    return selectOptions.reduce((total, detail) => {
      // 각 selectOptions의 additional price 계산 (옵션 가격 합 - 기준 가격)
      const additionalPriceSum =
        detail.options.reduce((sum, option) => sum + option.additionalPrice, 0) + product.price;

      // count만큼 곱한 후 전체 합산
      return total + additionalPriceSum * detail.count;
    }, 0);
  }

  return (
    <div className="max-w-custom mx-auto flex px-4 py-8 flex-col">
      <nav className="w-full bg-slate-50 border border-slate-300 mb-5 rounded-xl flex justify-end px-[30px] py-[10px]">
        <div className="text-xs font-semibold text-zinc-700 shadow-md bg-white rounded px-2 py-1">
          {product.category.name}
        </div>
      </nav>
      <div className="max-w-custom flex flex-col lg:flex-row gap-8">
        {/* 상품 이미지 */}
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <img
            src={product.images[0].url ?? '/placeholder-image.jpg'}
            alt={product.name}
            className="w-full h-auto lg:h-[500px] object-cover"
          />
        </div>

        <div className="w-full flex flex-col items-center lg:w-1/2 ">
          {/* 상품 정보 */}
          <div className="w-full flex-grow bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg py-[40px] px-[30px]">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="text-gray-600 text-sm flex items-center gap-2 mt-2">
              <span className="text-yellow-500">★ {product.reviewStatistic.averageRating ?? 0}</span>
              <span>|</span>
              <span className="cursor-pointer" onClick={() => setSelectedTab('리뷰')}>
                <span>{product.reviewStatistic.reviewCount}개의 리뷰</span>
                <span>{`>`}</span>
              </span>
            </div>
            <p className="text-2xl font-bold mt-4">{product.price.toLocaleString()}원</p>
            <div className="border-t my-[30px] border-[#646464]" />
            <ProdudctDetailClientOptions options={product.options} handleAddOptionDetail={handleAddOption} />
            <div className="border-t my-[30px] border-[#646464]" />
            {/* 선택된 옵션 */}
            <div className="flex flex-col gap-4">
              {selectOptions.map((options, i) => {
                return (
                  <ProductDetailSelectOptions
                    key={i}
                    product={product}
                    seletedOptionDetail={options}
                    handleOptionCount={handleOptionCount}
                    handleRemoveOption={handleRemoveOption}
                  />
                );
              })}
            </div>

            <div className="border-t my-[30px] border-[#646464]" />

            {/* 총 가격 */}
            <div className="flex justify-between">
              <span className="text-sm">총 상품 금액</span>
              <div className="flex gap-[15px] items-center">
                <span className="text-xs text-neutral-600">
                  총 수량 {selectOptions.reduce((sum, option) => sum + option.count, 0).toLocaleString()}개
                </span>
                <span>|</span>
                <span className="text-xl font-bold">
                  {calculateTotalAdditionalPrice().toLocaleString()}원
                  {/* {(product.price * selectOptions.reduce((sum, option) => sum + option.count, 0)).toLocaleString()}원 */}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-6 w-full">
            <button className="w-1/3 text-#082F49 border border-[#CBD5E1] font-bold rounded-lg">장바구니 추가</button>
            {/* 구매 버튼 */}
            <button
              className="px-6 py-3 bg-[#CBD5E1] text-[#082F49] font-bold rounded-lg grow"
              onClick={handlePurchase}
            >
              구매하기
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-[#D9D9D9] mt-[40px] mb-[50px]" />

      {/* 상세정보, 리뷰, QnA */}
      <div className="flex justify-center text-lg font-semibold w-full border border-[#D9D9D9] rounded-lg overflow-hidden">
        {['상세정보', '리뷰'].map((tab) => (
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
      {selectedTab === '상세정보' && <ProductDetailClientDescription product={product} />}
      {selectedTab === '리뷰' && <ProductDetailClientReview productId={product.id} />}
      <div className="border-t border-[#D9D9D9] mt-8 mb-8" />
      <ProductDegtailCards />
    </div>
  );
};

export default ProductDetailClient;
