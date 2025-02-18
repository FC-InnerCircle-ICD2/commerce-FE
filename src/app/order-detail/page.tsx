import { Footer, Header } from '@/components/layout';
import OrderItem from './_components/OrderItem';
import OrderDetailSearch from './_components/OrderDetailSearch';

export default async function OrderDetail({ query }: { query: Promise<{ data?: string }> }) {
  const { data } = await query;
  console.log('data: ', data);
  // if (!data) {
  //   return <p>No order data found.</p>;
  // }
  // let orderData = null;

  // try {
  //   orderData = JSON.parse(decodeURIComponent(data));
  // } catch {
  //   return <p>Error: Invalid order data</p>;
  // }

  const orderData = {
    content: [
      {
        orderId: '4002458913224599007',
        orderProductList: [
          {
            productId: '4002396259960888885',
            providerId: null,
            providerName: null,
            productName: '아크네스 더마 릴리프 모이스처',
            productImage: null,
            productPrice: 1000,
            quantity: 1,
          },
          {
            productId: '4002396259960888886',
            providerId: null,
            providerName: null,
            productName: '고양이열빙어 포켓 트릿 동결건조 간식',
            productImage: null,
            productPrice: 7000,
            quantity: 1,
          },
          {
            productId: '4002396259960888887',
            providerId: null,
            providerName: null,
            productName: '오쏘몰 이뮨 30일분 액상 멀티비타민',
            productImage: null,
            productPrice: 99000,
            quantity: 1,
          },
        ],
        totalOrderPrice: 107000,
        orderAt: '2025-02-14T02:11:23.48251',
        orderStatus: '배송 요청',
      },
      {
        orderId: '4002462645922988379',
        orderProductList: [
          {
            productId: '4002396259960888885',
            providerId: null,
            providerName: null,
            productName: '스너글 섬유탈취제 허거블 선샤인',
            productImage: null,
            productPrice: 12000,
            quantity: 1,
          },
        ],
        totalOrderPrice: 12000,
        orderAt: '2025-02-14T02:18:48.468236',
        orderStatus: '배송 요청',
      },
      {
        orderId: '4002604921769728845',
        orderProductList: [
          {
            productId: '4002396259960888885',
            providerId: null,
            providerName: null,
            productName: '그리니즈 고양이 필라인 간식',
            productImage: null,
            productPrice: 19000,
            quantity: 1,
          },
        ],
        totalOrderPrice: 19000,
        orderAt: '2025-02-13T22:01:29.069542',
        orderStatus: '배송 요청',
      },
    ],
    page: {
      size: 3,
      number: 0,
      totalElements: 7,
      totalPages: 3,
    },
  };

  return (
    <div className="w-[100%] h-auto flex flex-col items-center justify-center">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="flex flex-col w-full">
        <div className="mt-[20px] lg:mt-[50px] w-[calc(100%-32px)] lg:w-[calc(100%-200px)] flex flex-col lg:flex-row mx-auto">
          <div className="rounded-t-[.9375rem] border border-slate-300 bg-slate-50 w-full h-auto flex flex-col">
            <h3 className="text-md lg:text-lg font-semibold p-4 lg:p-8">주문/배송내역</h3>
            <OrderDetailSearch />
            {/* <div className="w-full h-[50px] lg:h-[60px] border-t border-slate-300 px-4 lg:px-8 flex items-center justify-between">
              <button className="bg-slate-500 rounded-full w-14 h-8 lg:h-10 text-sm text-white">전체</button>
              <div className="relative w-60 lg:w-72">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full border border-neutral-300 bg-white rounded-full h-8 lg:h-10 text-sm px-4"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 lg:px-3 lg:py-1"
                >
                  🔍
                </button>
              </div>
            </div> */}
          </div>
        </div>

        <div className=" w-[calc(100%-32px)] lg:w-[calc(100%-200px)] flex flex-col mx-auto">
          {orderData.content.map((orderInfo) => (
            <OrderItem orderInfo={orderInfo} key={orderInfo.orderId} />
          ))}
        </div>
      </div>

      <div className="mt-12 lg:mt-20 w-full flex flex-col">
        <Footer />
      </div>
    </div>
  );
}
