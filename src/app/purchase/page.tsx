import HeaderLogo from '@/assets/purchase/headerLogo.png';
import ChevronRight from '@/assets/purchase/chevronRight.png';

import TitleBoxContainer from './_components/TitleBoxContainer';
import WideSelectBox from './_components/WideSelectBox';
import OrderList from './_components/OrderList';
import PaymentMethod from './_components/PaymentMethod';
import PaymentDetail from './_components/PaymentDetail';

export default async function Purchase() {
  return (
    <div className="w-[100%] h-auto flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full h-[70px] shadow-[0px_15px_10px_rgba(233,233,233,0.25)] flex justify-between items-center">
        <div className="flex flex-1 items-center ml-[16px] lg:ml-[100px]">
          <img src={HeaderLogo.src} alt="Header Logo" />
        </div>
        <div className="flex flex-1 justify-center items-center text-xl font-medium">주문/결제</div>
        <div className="flex-1 mr-[16px] lg:mr-[100px]"></div>
      </div>

      {/* Navigator */}
      <div className="w-full h-[40px] md:h-[100px] px-[16px] lg:px-[100px] flex items-center flex-row-reverse">
        <div className="hidden md:flex items-center gap-1">
          <span className="text-sm font-medium">주문/결제</span>
          <img src={ChevronRight.src} alt="Expand payment method list" className="w-5 h-5" />
          <span className="text-sm font-light">완료</span>
        </div>
      </div>

      {/* Content */}
      <div className="w-[calc(100%-32px)] lg:w-[calc(100%-12.5rem)] flex flex-col lg:flex-row">
        {/* 배송지, 주문상품, 결제수단 */}
        <div className="flex flex-col mr-5 w-[100%] lg:w-[65%]">
          {/* 배송지 */}
          <TitleBoxContainer title="배송지" toggle={false}>
            <div className="flex justify-between items-center mb-1">
              <p className="font-medium text-base lg:text-lg">김지훈(집)</p>
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
              <div className="bg-neutral-300 w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-[10px]"></div>
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
    </div>
  );
}
