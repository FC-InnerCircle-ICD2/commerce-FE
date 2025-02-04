'use client';

import { Footer } from '@/components/layout';
import OrderList from './OrderList';
import PaymentDetail from './PaymentDetail';
import PaymentMethod from './PaymentMethod';
import TitleBoxContainer from './TitleBoxContainer';
import WideSelectBox from './WideSelectBox';
import PurchaseBanner from './PurchaseBanner';

export default function OrderContents() {
  return (
    <>
      <div className="w-[calc(100%-32px)] lg:w-[calc(100%-12.5rem)] flex flex-col lg:flex-row">
        {/* 배송지, 주문상품, 결제수단 */}
        <div className="flex flex-col mr-5 w-[100%] lg:w-[65%]">
          {/* 배송지 */}
          <TitleBoxContainer title="배송지" toggle={false}>
            <div className="flex justify-between items-center mb-1">
              <p className="font-medium text-base lg:text-lg">홍길동(집)</p>
              <button className="border border-neutral-300 px-3.5 py-2.5 bg-white rounded-lg text-sm">변경</button>
            </div>
            <span className="font-medium text-sm lg:text-base text-neutral-500 mb-3">010-1234-5678</span>
            <span className="font-medium text-sm mb-3">경기도 광명시 광명동 주소 (광명동, 주소) 101동 1004호</span>
            <WideSelectBox
              placeholder="배송메모를 선택해주세요"
              options={[
                '선택 안 함',
                '부재 시 문 앞에 놓아주세요.',
                '초인종 누르지 말아주세요',
                '배송 전 문자나 전화 부탁드립니다.',
                '경비실에 맡겨주세요.',
              ]}
            />
          </TitleBoxContainer>

          {/* 주문상품 */}
          <TitleBoxContainer title="주문상품" toggle={false} margin="mb-5">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-base lg:text-lg">테리파머</p>
              <span className="font-medium text-sm lg:text-base text-neutral-500">무료 배송</span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <img
                className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-[10px]"
                src="https://img.29cm.co.kr/next-product/2023/01/20/c26eef752da8444e876d51af65dfcb02_20230120135009.jpg?width=700"
                alt="product image"
              />
              <p className="font-normal ml-[10px] w-[calc(100%-90px)] text-sm lg:text-base lg:w-[calc(100%-110px)] flex flex-row-reverse">
                테리파머 170g 고중량 국민 선물 호텔수건 5+5 총 수건 10장 세트 타올 샤워 타월
              </p>
            </div>

            <OrderList
              products={[
                { name: '02_180g 자카드 호텔수건 5+5 / 베이비블루', quantity: 1, price: 28900 },
                { name: '02_180g 자카드 호텔수건 5+5 / 베이비블루', quantity: 1, price: 28900 },
                { name: '02_180g 자카드 호텔수건 5+5 / 베이비블루', quantity: 1, price: 28900 },
              ]}
            />
          </TitleBoxContainer>

          <TitleBoxContainer title={null} toggle={false}>
            <div className="flex justify-between items-center">
              <span className="text-base lg:text-lg font-medium">총 주문금액</span>
              <span className="text-base lg:text-lg font-bold">86,700원</span>
            </div>
          </TitleBoxContainer>

          {/* 결제수단 */}
          <TitleBoxContainer title="결제수단" toggle={true} toggleTitle="86,700원">
            <PaymentMethod />
          </TitleBoxContainer>
        </div>

        {/* 결제상세 */}
        <div className="w-full lg:w-[35%]">
          <TitleBoxContainer title="결제상세" toggle={true} toggleTitle="86,700원">
            <PaymentDetail />
          </TitleBoxContainer>
        </div>
      </div>

      <div className="w-full md:pb-[90px] lg:pb-[100px]">
        <Footer />
      </div>
      <PurchaseBanner />
    </>
  );
}
