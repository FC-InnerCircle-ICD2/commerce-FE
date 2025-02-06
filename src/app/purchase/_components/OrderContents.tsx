'use client';

import { Footer } from '@/components/layout';
import OrderList from './OrderList';
import PaymentDetail from './PaymentDetail';
import PaymentMethod from './PaymentMethod';
import TitleBoxContainer from './TitleBoxContainer';
import WideSelectBox from './WideSelectBox';
import PurchaseBanner from './PurchaseBanner';
import { useState } from 'react';
import type { CardInfo, Delivery, PaymentMethodType } from '@/api/order';
import { numberFormatting } from '@/utils/numberFormatting';

interface DetailOption {
  id: number;
  value: string;
  quantity: number;
  order: number;
  additionalPrice?: number | null;
  images: Array<{
    id: number;
    fileOrder: number;
    url: string;
    representative: boolean;
  }>;
}
interface OptionInfo {
  id: number;
  name: string;
  optionDetails: Array<DetailOption>;
}
interface SelectedOption {
  count: number;
  optionName: string;
  value: string;
  quantity: number;
  price: number;
}
interface ProductParamsData {
  product: {
    options: OptionInfo[];
    reviewStatistic: {
      averageRating: number;
      reviewCount: number;
    };
    id: number;
    name: string;
    description: string;
    price: number;
    category: {
      id: number;
      name: string;
      parentCategoryId: number;
      subCategories: Array<unknown>;
    };
    provider: {
      id: number;
      name: string;
      description: string | null;
    };
  };
  selectedOptions: SelectedOption[];
}

export default function OrderContents(props: { orderData: ProductParamsData }) {
  const { orderData } = props;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('BANK_TRANSFER');
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardNumber: '',
    expirationDate: '',
    cvc: '',
    cardOwnerName: '',
  });
  const [delivery, setDelivery] = useState<Delivery>({
    name: '홍길동',
    phoneNumber: '010-1234-5678',
    zonecode: '12345',
    address: '경기도 광명시 광명동 주소',
    detailAddress: '101동 1004호',
    deliveryMemo: '',
  });
  const representativeImageUrl = orderData?.product.options
    .flatMap((option) => option.optionDetails)
    .flatMap((detail) => detail.images)
    .find((images) => images.representative);

  const orderOptionItems = orderData?.selectedOptions?.map((option) => {
    const findOption = (name: string) => orderData.product.options.find((option) => option.name === name);
    const findOptionDetail = (option: OptionInfo | undefined, name: string) =>
      option?.optionDetails.find((detail) => detail.value === name);

    const currentOption = findOption(option.optionName);
    const currentOptionDetail = findOptionDetail(currentOption, option.value);

    return {
      productId: orderData.product.id,
      options: [
        {
          productOptionName: option.optionName,
          productOptionId: currentOption?.id ?? 0,
          productOptionValue: currentOptionDetail?.value ?? '',
          productOptionDetailId: currentOptionDetail?.id ?? 0,
        },
      ],
      quantity: option.count,
      price: option.price,
      categoryId: orderData.product.category.id,
    };
  });

  const getTotalPrice = <T extends boolean>(
    selectedOptions: SelectedOption[],
    formatted: T,
  ): T extends true ? string : number => {
    const total = selectedOptions.reduce((acc, cur) => (acc += cur.price * cur.count), 0);
    // TODO: any 제거 해야함.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (formatted ? `${numberFormatting(total)}원` : total) as any;
  };

  return (
    <>
      <div className="w-[calc(100%-32px)] lg:w-[calc(100%-12.5rem)] flex flex-col lg:flex-row">
        {/* 배송지, 주문상품, 결제수단 */}
        <div className="flex flex-col mr-5 w-[100%] lg:w-[65%]">
          {/* 배송지 */}
          <TitleBoxContainer title="배송지" toggle={false}>
            <div className="flex justify-between items-center mb-1">
              <p className="font-medium text-base lg:text-lg">{delivery.name}</p>
              <button className="border border-neutral-300 px-3.5 py-2.5 bg-white rounded-lg text-sm">변경</button>
            </div>
            <span className="font-medium text-sm lg:text-base text-neutral-500 mb-3">{delivery.phoneNumber}</span>
            <span className="font-medium text-sm mb-3">{`${delivery.address} ${delivery.detailAddress}`}</span>
            <WideSelectBox
              placeholder="배송메모를 선택해주세요"
              delivery={delivery}
              setDelivery={setDelivery}
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
            {orderData && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <p className="font-medium text-base lg:text-lg">{orderData.product.name}</p>
                  <span className="font-medium text-sm lg:text-base text-neutral-500">무료 배송</span>
                </div>

                <div className="flex justify-between items-center mb-4">
                  {representativeImageUrl ? (
                    <img
                      className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-[10px]"
                      src={representativeImageUrl.url}
                      alt="product image"
                    />
                  ) : (
                    <div className="bg-neutral-300 w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-[10px]"></div>
                  )}
                  <p className="font-normal ml-[10px] w-[calc(100%-90px)] text-sm lg:text-base lg:w-[calc(100%-110px)] flex flex-row-reverse">
                    {orderData.product.description}
                  </p>
                </div>

                <OrderList productOptions={orderOptionItems} />
              </>
            )}
          </TitleBoxContainer>

          <TitleBoxContainer title={null} toggle={false}>
            <div className="flex justify-between items-center">
              <span className="text-base lg:text-lg font-medium">총 주문금액</span>
              <span className="text-base lg:text-lg font-bold">{getTotalPrice(orderData.selectedOptions, true)}</span>
            </div>
          </TitleBoxContainer>

          {/* 결제수단 */}
          <TitleBoxContainer
            title="결제수단"
            toggle={true}
            toggleTitle={getTotalPrice(orderData.selectedOptions, true)}
          >
            <PaymentMethod
              setCardInfo={setCardInfo}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          </TitleBoxContainer>
        </div>

        {/* 결제상세 */}
        <div className="w-full lg:w-[35%]">
          <TitleBoxContainer
            title="결제상세"
            toggle={true}
            toggleTitle={getTotalPrice(orderData.selectedOptions, true)}
          >
            <PaymentDetail paymentMethod={paymentMethod} totalPrice={getTotalPrice(orderData.selectedOptions, true)} />
          </TitleBoxContainer>
        </div>
      </div>

      <div className="w-full md:pb-[90px] lg:pb-[100px]">
        <Footer />
      </div>
      <PurchaseBanner
        paymentMethod={paymentMethod}
        cardInfo={cardInfo}
        orderItems={orderOptionItems}
        delivery={delivery}
        totalPrice={getTotalPrice(orderData.selectedOptions, false)}
      />
    </>
  );
}
