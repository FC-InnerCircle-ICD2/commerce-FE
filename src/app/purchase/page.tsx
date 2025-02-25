import HeaderLogo from '@/assets/purchase/headerLogo.png';
import ChevronRight from '@/assets/purchase/chevronRight.png';
import OrderContents from './_components/OrderContents';

export default async function Purchase({ searchParams }: { searchParams: Promise<{ data?: string }> }) {
  const { data } = await searchParams;
  if (!data) {
    return <p>No order data found.</p>;
  }
  let orderData = null;

  try {
    orderData = JSON.parse(decodeURIComponent(data));
    // orderData = {
    //   product: {
    //     id: 1,
    //     productId: 1,
    //     name: '핸드폰',
    //     description: '핸드폰 설명',
    //     price: 1500000,
    //     category: {
    //       id: 1,
    //       name: '전자제품',
    //       parentCategoryId: null,
    //       subCategories: [
    //         {
    //           id: 4,
    //           name: '노트북',
    //           parentCategoryId: 1,
    //           subCategories: [],
    //         },
    //         {
    //           id: 5,
    //           name: '스마트폰',
    //           parentCategoryId: 1,
    //           subCategories: [],
    //         },
    //         {
    //           id: 6,
    //           name: '태블릿',
    //           parentCategoryId: 1,
    //           subCategories: [],
    //         },
    //       ],
    //     },
    //     provider: {
    //       id: 1,
    //       name: 'TechProvider',
    //       description: '최고의 기술 제품 제공 업체',
    //     },
    //     options: [
    //       {
    //         id: 5,
    //         name: '색상',
    //         optionDetails: [
    //           {
    //             id: 8,
    //             value: '검정',
    //             quantity: 50,
    //             order: 1,
    //             additionalPrice: 0,
    //           },
    //           {
    //             id: 12,
    //             value: '은색',
    //             quantity: 30,
    //             order: 2,
    //             additionalPrice: 10000,
    //           },
    //         ],
    //       },
    //       {
    //         id: 6,
    //         name: '사이즈',
    //         optionDetails: [
    //           {
    //             id: 8,
    //             value: 'XS',
    //             quantity: 50,
    //             order: 1,
    //             additionalPrice: 0,
    //           },
    //           {
    //             id: 10,
    //             value: 'MD',
    //             quantity: 20,
    //             order: 2,
    //             additionalPrice: 3000,
    //           },
    //           {
    //             id: 12,
    //             value: 'LG',
    //             quantity: 30,
    //             order: 2,
    //             additionalPrice: 10000,
    //           },
    //         ],
    //       },
    //     ],
    //     reviewStatistic: {
    //       averageRating: 4.5,
    //       reviewCount: 120,
    //     },
    //     rating: 3,
    //     images: [
    //       {
    //         id: 1,
    //         fileOrder: 1,
    //         url: 'https://example.com/images/main.png',
    //         type: 'MAIN',
    //       },
    //       {
    //         id: 5,
    //         fileOrder: 1,
    //         url: 'https://example.com/images/datail.png',
    //         type: 'DETAIL',
    //       },
    //     ],
    //   },
    //   selectedOptions: [
    //     {
    //       count: 1,
    //       options: [
    //         {
    //           optionName: '색상',
    //           id: 5,
    //           detailId: 12,
    //           value: '은색',
    //           additionalPrice: 10000,
    //           quantity: 30,
    //         },
    //         {
    //           optionName: '사이즈',
    //           id: 6,
    //           detailId: 10,
    //           value: 'MD',
    //           additionalPrice: 3000,
    //           quantity: 20,
    //         },
    //       ],
    //     },
    //     {
    //       count: 1,
    //       options: [
    //         {
    //           optionName: '색상',
    //           id: 5,
    //           detailId: 12,
    //           value: '은색',
    //           additionalPrice: 10000,
    //           quantity: 30,
    //         },
    //         {
    //           optionName: '사이즈',
    //           id: 6,
    //           detailId: 12,
    //           value: 'LG',
    //           additionalPrice: 10000,
    //           quantity: 30,
    //         },
    //       ],
    //     },
    //     {
    //       count: 1,
    //       options: [
    //         {
    //           optionName: '색상',
    //           id: 5,
    //           detailId: 8,
    //           value: '검정',
    //           additionalPrice: 0,
    //           quantity: 50,
    //         },
    //         {
    //           optionName: '사이즈',
    //           id: 6,
    //           detailId: 10,
    //           value: 'MD',
    //           additionalPrice: 3000,
    //           quantity: 20,
    //         },
    //       ],
    //     },
    //   ],
    // };
  } catch {
    return <p>Error: Invalid order data</p>;
  }

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
      <OrderContents orderData={orderData} />
    </div>
  );
}
