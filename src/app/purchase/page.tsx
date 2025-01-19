import ExpandLess from '@/assets/purchase/expandLess.png';
import ExpandSelect from '@/assets/purchase/expandSelect.png';
import HeaderLogo from '@/assets/purchase/headerLogo.png';
import ChevronRight from '@/assets/purchase/chevronRight.png';

export default async function Purchase() {
  const response = await fetch('https://example.com/user');

  const data = await response.json();
  console.log(data);

  return (
    <div className="w-[100%] h-auto flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full h-[70px] shadow-[0px_15px_10px_rgba(233,233,233,0.25)] flex justify-between items-center">
        <div className="flex flex-1 items-center ml-[100px]">
          <img src={HeaderLogo.src} alt="Header Logo" />
        </div>
        <div className="flex flex-1 justify-center items-center text-xl font-medium">주문/결제</div>
        <div className="flex-1 mr-[100px]"></div>
      </div>

      {/* Navigator */}
      <div className="w-full h-[100px] flex items-center flex-row-reverse px-[100]">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">주문/결제</span>
          <img src={ChevronRight.src} alt="Expand payment method list" className="w-5 h-5" />
          <span className="text-sm font-light">완료</span>
        </div>
      </div>

      {/* Content */}
      <div className="w-[calc(100%-12.5rem)] flex">
        {/* 배송지, 주문상품, 결제수단 */}
        <div className="flex flex-col w-[65%] mr-5">
          {/* 배송지 */}
          <div className="mb-14">
            <h3 className="font-bold text-2xl mb-5">배송지</h3>
            <div className="rounded-[.9375rem] border border-slate-300 bg-slate-50 w-full h-auto p-8 flex flex-col">
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium text-lg">김지훈(집)</p>
                <button className="border border-neutral-300 px-3.5 py-2.5 bg-white rounded-lg text-sm">변경</button>
              </div>
              <span className="font-medium text-base text-neutral-500 mb-3">010-1234-5678</span>
              <span className="font-medium text-sm mb-3">경기도 광명시 광명동 주소 (광명동, 주소) 101동 1004호</span>
              <div className="relative w-1/2">
                <div className="w-full h-12 border border-slate-300 rounded-[10px] bg-white text-sm text-neutral-400 flex justify-between items-center p-5">
                  <span>배송메모를 선택해 주세요</span>
                  <button>
                    <img src={ExpandSelect.src} alt="Expand delivery note list" className="w-6 h-6" />
                  </button>
                </div>
                <ul className="w-full h-auto rounded-[10px] bg-white flex flex-col px-5 py-3 mt-2 shadow-[0px_10px_15px_rgba(173,173,173,0.25)] absolute">
                  <li className="font-normal text-sm text-neutral-600">
                    <button className="p-2 rounded-md hover:bg-slate-100 hover:text-neutral-800">
                      부재 시 문 앞에 놓아주세요.
                    </button>
                  </li>
                  <li className="font-normal text-sm text-neutral-600">
                    <button className="p-2 rounded-md hover:bg-slate-100 hover:text-neutral-800">
                      초인종 누르지 말아주세요
                    </button>
                  </li>
                  <li className="font-normal text-sm text-neutral-600">
                    <button className="p-2 rounded-md hover:bg-slate-100 hover:text-neutral-800">
                      배송 전 문자나 전화 부탁드립니다.
                    </button>
                  </li>
                  <li className="font-normal text-sm text-neutral-600">
                    <button className="p-2 rounded-md hover:bg-slate-100 hover:text-neutral-800">
                      경비실에 맡겨주세요.
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 주문상품 */}
          <div className="mb-5">
            <h3 className="font-bold text-2xl mb-5">주문상품</h3>
            <div className="rounded-[.9375rem] border border-slate-300 bg-slate-50 w-full h-auto p-8 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <p className="font-medium text-lg">테리파머</p>
                <span className="font-medium text-base text-neutral-500">무료 배송</span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="bg-neutral-300 w-24 h-24 rounded-[10px] pr-5"></div>
                <p className="font-normal">
                  테리파머 170g 고중량 국민 선물 호텔수건 5+5 총 수건 10장 세트 타올 샤워 타월
                </p>
              </div>

              <ul>
                <li className="border border-slate-300 rounded-[10px] bg-white w-full h-12 p-4 my-[5px] flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="border border-[#c9c9c9] rounded-[10px] bg-white p-2 text-[11px] mr-2.5">옵션</span>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700 text-sm">02_180g 자카드 호텔수건 5+5 / 베이비블루</span>
                      <span className="w-px h-4 bg-[#afafaf] mx-2"></span>
                      <span className="text-sm">1개</span>
                    </div>
                  </div>
                  <span className="font-semibold text-sm">28,900원</span>
                </li>

                <li className="border border-slate-300 rounded-[10px] bg-white w-full h-12 p-4 my-[5px] flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="border border-[#c9c9c9] rounded-[10px] bg-white p-2 text-[11px] mr-2.5">옵션</span>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700 text-sm">02_180g 자카드 호텔수건 5+5 / 베이비블루</span>
                      <span className="w-px h-4 bg-[#afafaf] mx-2"></span>
                      <span className="text-sm">1개</span>
                    </div>
                  </div>
                  <span className="font-semibold text-sm">28,900원</span>
                </li>

                <li className="border border-slate-300 rounded-[10px] bg-white w-full h-12 p-4 my-[5px] flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="border border-[#c9c9c9] rounded-[10px] bg-white p-2 text-[11px] mr-2.5">옵션</span>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-700 text-sm">02_180g 자카드 호텔수건 5+5 / 베이비블루</span>
                      <span className="w-px h-4 bg-[#afafaf] mx-2"></span>
                      <span className="text-sm">1개</span>
                    </div>
                  </div>
                  <span className="font-semibold text-sm">28,900원</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-[.9375rem] border border-slate-300 bg-slate-50 w-full h-auto p-8 flex justify-between mb-14">
            <span className="text-lg font-medium">총 주문금액</span>
            <span className="text-lg font-bold">86,700원</span>
          </div>

          {/* 결제수단 */}
          <div className="mb-14 w-full">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-2xl">결제수단</h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">86,700원</span>
                <button>
                  <img src={ExpandLess.src} alt="Expand payment method list" className="w-8 h-8" />
                </button>
              </div>
            </div>
            <div className="rounded-[.9375rem] border border-slate-300 bg-slate-50 w-full h-auto p-8 flex flex-col">
              <div className="flex items-center gap-2">
                <input type="radio" name="payment" id="account" className="w-[25] h-[25]" checked />
                <label htmlFor="account" className="ml-2.5 text-lg font-medium">
                  계좌 간편결제
                </label>
              </div>
              <hr className="my-[30px]" />
              <div className="flex items-center gap-2">
                <input type="radio" name="payment" id="card" className="w-[25] h-[25]" />
                <label htmlFor="card" className="ml-2.5 text-lg font-medium">
                  카드 간편결제
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 결제상세 */}
        <div className="w-[35%]">
          <div className="mb-14">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-bold text-2xl">결제상세</h3>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">86,700원</span>
                <button>
                  <img src={ExpandLess.src} alt="Expand payment method list" className="w-8 h-8" />
                </button>
              </div>
            </div>

            <div className="rounded-[.9375rem] border border-slate-300 bg-slate-50 w-full h-auto p-8 flex flex-col">
              <div className="flex justify-between items-center">
                <p className="font-medium text-md">계좌 간편결제</p>
                <p className="font-bold text-md">86,700원</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
