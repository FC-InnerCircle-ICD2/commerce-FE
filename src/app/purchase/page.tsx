import HeaderLogo from '@/assets/purchase/headerLogo.png';
import ChevronRight from '@/assets/purchase/chevronRight.png';
import OrderContents from './_components/OrderContents';

export default async function Purchase({ searchParams }: { searchParams: { data?: string } }) {
  // if (!searchParams.data) {
  //   return <p>No order data found.</p>;
  // }
  // let orderData = null;

  // try {
  //   orderData = JSON.parse(decodeURIComponent(searchParams.data));
  // } catch (error) {
  //   console.error('Decoding error:', error);
  //   return <p>Error: Invalid order data</p>;
  // }
  const orderData = {
    product: {
      options: [
        {
          id: 3995568896678930400,
          name: 'One Color',
          optionDetails: [
            {
              images: [
                {
                  id: 2951,
                  fileOrder: 0,
                  url: 'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/2ff8/415b209f442f180f2505fa6689e913ad93cb9aa11ad386e9625b1a0f23fc.png',
                  representative: true,
                },
              ],
              id: 3995568896677763600,
              value: '원피스',
              quantity: 0,
              order: 0,
              additionalPrice: null,
            },
            {
              images: [
                {
                  id: 2952,
                  fileOrder: 0,
                  url: 'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/vendor_inventory/2ff8/415b209f442f180f2505fa6689e913ad93cb9aa11ad386e9625b1a0f23fc.png',
                  representative: true,
                },
              ],
              id: 3995568896680370000,
              value: '셔츠',
              quantity: 0,
              order: 0,
              additionalPrice: null,
            },
          ],
        },
      ],
      reviewStatistic: {
        averageRating: 0,
        reviewCount: 0,
      },
      id: 8554770835,
      name: '휘잇 몰디브 커플 시밀러룩 휴양지 바캉스 원피스 셔츠',
      description:
        '사용대상 구분: 여성용\n제조년도: 상시제작\n사용계절: 여름용\n안감 종류: 기본\n소재: 폴리에스터 혼방\n쿠팡상품번호: 8554770835 - 24771917424\n',
      price: 36000,
      category: {
        id: 503013,
        name: '커플룩/패밀리룩',
        parentCategoryId: 502993,
        subCategories: [],
      },
      provider: {
        id: 3995563593834247000,
        name: '상품 상세페이지 참조',
        description: null,
      },
    },
    selectedOptions: [
      {
        count: 1,
        optionName: 'One Color',
        value: '셔츠',
        quantity: 0,
        price: 36000,
      },
      {
        count: 1,
        optionName: 'One Color',
        value: '원피스',
        quantity: 0,
        price: 36000,
      },
    ],
  };
  console.log(orderData);
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
